from rest_framework import serializers
from .models import (
    CategoryRest,
    Restaurant,
    Meal,
    CompleteOrder,
    OrderMeal,
    ReviewRestaurant
)

class CategoryRestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryRest
        fields = '__all__'

class RestaurantSerializer(serializers.ModelSerializer):
    rating = serializers.CharField()
    class Meta:
        model = Restaurant
        fields = '__all__'

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = '__all__'

class OrderMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderMeal
        fields = '__all__'
        
    def to_representation(self, instance):
        rep = super(OrderMealSerializer, self).to_representation(instance)
        rep['meal'] = instance.meal.name
        return rep

class CompleteOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompleteOrder
        fields = '__all__'
    
    def to_representation(self, instance):
        rep = super(CompleteOrderSerializer, self).to_representation(instance)
        rep['restaurant'] = instance.restaurant.name
        return rep

class ReviewRestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewRestaurant
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(ReviewRestSerializer, self).to_representation(instance)
        rep['user'] = instance.user.username
        return rep
