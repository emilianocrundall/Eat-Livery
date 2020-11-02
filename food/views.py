from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, permissions, filters
from django.utils import timezone
from rest_framework.views import APIView, status
from .serializers import (
    CategoryRestSerializer,
    RestaurantSerializer,
    MealSerializer,
    ReviewRestSerializer,
    CompleteOrderSerializer,
    OrderMealSerializer
)
from .models import (
    CategoryRest,
    Restaurant,
    Meal,
    CompleteOrder,
    ReviewRestaurant,
    OrderMeal
)

class RestaurantListAPIView(generics.ListAPIView):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)

class CategoriesRestAPIView(generics.ListAPIView):
    serializer_class = CategoryRestSerializer
    queryset = CategoryRest.objects.all()

class CategoryRestAPIView(APIView):
    
    def get(self, request, cat_id, format=None):
        try:
            category = CategoryRest.objects.get(id=cat_id)
            serializer = CategoryRestSerializer(category)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except CategoryRest.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class RestByCatAPIView(generics.ListAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        cat_id = self.kwargs['cat_id']
        queryset = Restaurant.objects.filter(category=cat_id)
        return queryset

class AddRestCategoryAPIVIew(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, format=None):
        serializer = CategoryRestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

class RestaurantAPIView(APIView):

    def get(self, request, rest_id, format=None):
        try:
            rest = Restaurant.objects.get(id=rest_id)
            serializer = RestaurantSerializer(rest)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Restaurant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class MealsAPIView(generics.ListAPIView):
    serializer_class = MealSerializer

    def get_queryset(self):
        rest_id = self.kwargs['rest_id']
        queryset = Meal.objects.filter(restaurant=rest_id)
        return queryset

class MealAPIView(APIView):
    def get(self, request, meal_id, format=None):
        try:
            meal = Meal.objects.get(id=meal_id)
            serializer = MealSerializer(meal)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Meal.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)

class AddMealAPIView(APIView):
    permissions = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, format=None):
        rest = Restaurant.objects.get(owned_by=request.user.id)
        request.data.update({
            "restaurant": rest.id,
        })
        serializer = MealSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

class UpdateMealAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = MealSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def update(self, request, *args, **kwargs):
        meal = Meal.objects.get(id=self.kwargs['meal_id'])
        serializer = self.serializer_class(meal, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)

class DeleteMealAPIView(APIView):
    serializer_class = MealSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def delete(self, request, meal_id, format=None):
        try:
            meal = Meal.objects.get(id=meal_id)
            meal.delete()
        except Meal.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)

class ManageRestaurantAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, format=None):
        try:
            rest = Restaurant.objects.get(owned_by=self.request.user.id)
            serializer = RestaurantSerializer(rest)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Restaurant.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)

class AddRestaurantAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, format=None):
        request.data.update({"owned_by":self.request.user.id})
        serializer = RestaurantSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

class CreateOrderAPIView(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, format=None):
        request.data[0].update({"date": timezone.now(), "owner": self.request.user.id})
        serializer = CompleteOrderSerializer(data=request.data[0])
        serializer.is_valid(raise_exception=True)
        serializer.save()
        for meal in request.data[1]:
            OrderMeal.objects.create(
                meal_id=meal['item'],
                order_id=serializer.data['id'],
                quantity=meal['quantity']
            )
        return Response(status=status.HTTP_201_CREATED)

class GetOrdersUserAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CompleteOrderSerializer
    def get_queryset(self):
        queryset = CompleteOrder.objects.filter(owner=self.request.user)
        return queryset

class GetOrdersManagerAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CompleteOrderSerializer
    def get_queryset(self):
        rest_id = self.kwargs['rest_id']
        queryset = CompleteOrder.objects.filter(restaurant=rest_id)
        return queryset

class OrderDetailAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self, request, order_id, format=None):
        try:
            order = CompleteOrder.objects.get(id=order_id)
            serializer = CompleteOrderSerializer(order)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except CompleteOrder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class UpdateOrderStatusAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CompleteOrderSerializer
    def update(self, request, *args, **kwargs):
        order = CompleteOrder.objects.get(id=self.kwargs['order_id'])
        serializer = self.serializer_class(order, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class OrdersRestaurantAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CompleteOrderSerializer
    def get_queryset(self):
        rest_id = self.kwargs['rest_id']
        queryset = CompleteOrder.objects.filter(restaurant_id=rest_id)
        return queryset

class MealsFormOrderAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = OrderMealSerializer
    def get_queryset(self):
        order_id = self.kwargs['order_id']
        queryset = OrderMeal.objects.filter(order_id=order_id)
        return queryset

class DeleteOrderAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def delete(self, request, order_id, format=None):
        order = CompleteOrder.objects.get(id=order_id)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostReviewAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, rest_id, format=None):
        request.data.update({
            'restaurant': rest_id,
            'user': self.request.user.id,
            'date': timezone.now()
        })
        serializer = ReviewRestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

class ReviewsRestAPIView(generics.ListAPIView):
    serializer_class = ReviewRestSerializer

    def get_queryset(self):
        rest_id = self.kwargs['rest_id']
        queryset = ReviewRestaurant.objects.filter(restaurant_id=rest_id)
        return queryset
