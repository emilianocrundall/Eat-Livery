from django.db import models
from django.conf import settings
from django.db.models import Avg

class CategoryRest(models.Model):
    name = models.CharField(max_length=200)

class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(
        CategoryRest,
        on_delete=models.CASCADE,
        related_name='cat_res'
    )
    open_hour = models.TimeField(auto_now_add=False)
    close_hour = models.TimeField(auto_now_add=False)
    owned_by = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='ownedby'
    )
    image = models.ImageField(upload_to="covers/%Y/%m/%D/")
    not_available = models.BooleanField(default=False)

    @property
    def rating(self):
        avg_rating = self.rest_review.all().aggregate(Avg('score')).get('score__avg', 0.00)
        if avg_rating is None:
            avg_rating = 0.00
        return avg_rating

class Meal(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to="covers/%Y/%m/%D/")
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='restaurant_from'
    )
    price = models.IntegerField()

class CompleteOrder(models.Model):
    date = models.DateTimeField(auto_now_add=True, null=True)
    city = models.CharField(max_length=300)
    adress = models.CharField(max_length=350)
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='rest'
    )
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='costumer',
        null=True
    )
    status = models.IntegerField(blank=True, null=True)
    total = models.IntegerField(blank=True, null=True)

class OrderMeal(models.Model):
    meal = models.ForeignKey(
        Meal,
        on_delete=models.CASCADE,
        related_name='food'
    )
    quantity = models.IntegerField(default=1, blank=True)
    order = models.ForeignKey(CompleteOrder, related_name='order_meal', on_delete=models.CASCADE)

class ReviewRestaurant(models.Model):
    text = models.CharField(max_length=400)
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='rest_review'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_review'
    )
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
