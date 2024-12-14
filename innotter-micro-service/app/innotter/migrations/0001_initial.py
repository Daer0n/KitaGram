# Generated by Django 4.2.7 on 2023-11-11 12:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Page",
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
                ("name", models.CharField(max_length=50)),
                (
                    "description",
                    models.CharField(
                        blank=True, default=None, max_length=100, null=True
                    ),
                ),
                ("user_id", models.UUIDField()),
                ("image_url", models.URLField(blank=True, default=None, null=True)),
                ("followers", models.PositiveIntegerField(default=0)),
                ("blocked", models.BooleanField(default=False)),
                ("unblock_date", models.DateField(blank=True, default=None, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("modified_at", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="Tag",
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
                ("name", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Post",
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
                ("content", models.JSONField()),
                (
                    "reply_to_post_id",
                    models.PositiveBigIntegerField(blank=True, default=None, null=True),
                ),
                ("likes", models.PositiveIntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("modified_at", models.DateTimeField(auto_now=True)),
                (
                    "page",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="innotter.page"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="page",
            name="tags",
            field=models.ManyToManyField(to="innotter.tag"),
        ),
        migrations.CreateModel(
            name="Like",
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
                (
                    "post_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="innotter.post"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Follower",
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
                (
                    "page_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="innotter.page"
                    ),
                ),
            ],
        ),
    ]