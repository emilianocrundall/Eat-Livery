from django.urls import path
from accounts import views
from knox import views as knox_views

urlpatterns = [
    path('api/auth/register', views.RegisterAPIView.as_view()),
    path('api/auth/manager/register', views.RegisterOwnerAPIView.as_view()),
    path('api/auth/login', views.LoginAPIView.as_view()),
    path('api/auth/load_user', views.LoadUserAPIVIew.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='logout')
]
