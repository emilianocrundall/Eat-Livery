# Generated by Django 3.1.1 on 2020-10-08 19:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='meal',
            name='category',
        ),
        migrations.DeleteModel(
            name='CategoryFood',
        ),
    ]
