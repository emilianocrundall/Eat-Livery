# Generated by Django 3.1.1 on 2020-10-16 21:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0004_delete_reviewmeal'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='quantity',
        ),
    ]
