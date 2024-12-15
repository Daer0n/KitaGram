# Generated by Django 4.2.7 on 2024-12-15 07:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("innotter", "0004_room_datetime"),
    ]

    operations = [
        migrations.CreateModel(
            name="Priority",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("user_id", models.UUIDField()),
                ("count", models.PositiveIntegerField(default=1)),
                (
                    "tag",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="innotter.tag"
                    ),
                ),
            ],
        ),
    ]