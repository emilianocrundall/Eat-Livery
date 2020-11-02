from django.urls import path
from food import views

urlpatterns = [
    path('api/list_restaurants/', views.RestaurantListAPIView.as_view()),
    path('api/categories_rest/', views.CategoriesRestAPIView.as_view()),
    path('api/categories_rest/<cat_id>/', views.CategoryRestAPIView.as_view()),
    path('api/rest_by_cat/<cat_id>/', views.RestByCatAPIView.as_view()),
    path('api/add_rest_category/', views.AddRestCategoryAPIVIew.as_view()),
    path('api/restaurants/<rest_id>/', views.RestaurantAPIView.as_view()),
    path('api/<rest_id>/menu/', views.MealsAPIView.as_view()),
    path('api/meals/<meal_id>/', views.MealAPIView.as_view()),
    path('api/add_meal/', views.AddMealAPIView.as_view()),
    path('api/update_meal/<meal_id>/', views.UpdateMealAPIView.as_view()),
    path('api/delete_meal/<meal_id>/', views.DeleteMealAPIView.as_view()),
    path('api/own_restaurant/', views.ManageRestaurantAPIView.as_view()),
    path('api/add_restaurant/', views.AddRestaurantAPIView.as_view()),
    path('api/create_order/', views.CreateOrderAPIView.as_view()),
    path('api/user_orders/', views.GetOrdersUserAPIView.as_view()),
    path('api/get_manager_orders/<rest_id>/', views.GetOrdersManagerAPIView.as_view()),
    path('api/orders/<order_id>/', views.OrderDetailAPIView.as_view()),
    path('api/status_update/<order_id>/', views.UpdateOrderStatusAPIView.as_view()),
    path('api/rest_orders/<rest_id>/', views.OrdersRestaurantAPIView.as_view()),
    path('api/meals_from_order/<order_id>/', views.MealsFormOrderAPIView.as_view()),
    path('api/delete_order/<order_id>/', views.DeleteOrderAPIView.as_view()),
    path('api/post_review/<rest_id>/', views.PostReviewAPIView.as_view()),
    path('api/reviews/<rest_id>/', views.ReviewsRestAPIView.as_view())
]
