# Generated by Django 3.1.1 on 2020-10-15 19:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0003_reviewmeal_reviewrestaurant'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ReviewMeal',
        ),
    ]
