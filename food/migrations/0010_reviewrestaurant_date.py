# Generated by Django 3.1.1 on 2020-10-28 22:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0009_completeorder_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='reviewrestaurant',
            name='date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
