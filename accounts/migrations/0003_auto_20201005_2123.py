# Generated by Django 3.1.1 on 2020-10-05 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20201005_1932'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='isAdmin',
            field=models.BooleanField(default=False),
        ),
    ]
