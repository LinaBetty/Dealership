# Uncomment the following imports before adding the Model code

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class CarMake(models.Model):
    name = models.CharField(null=False, max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return "Name: " + self.name + "," + \
            "Description: " + self.description


class CarModel(models.Model):

    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('COUPE', 'Coupe'),
        ('CONVERTIBLE', 'Convertible'),
        ('HATCHBACK', 'Hatchback'),
        ('WAGON', 'Wagon'),
        ('MINIVAN', 'Minivan'),
    ]

    car_make = models.ForeignKey(CarMake, null=True, on_delete=models.CASCADE)
    name = models.CharField(null=False, max_length=100)
    type = models.CharField(null=False, max_length=20,
                            choices=CAR_TYPES, default='SUV')
    year = models.IntegerField(default=2023, validators=[
            MinValueValidator(2015, message='The year must be ' +
                              'greater or equal than 2015'),
            MaxValueValidator(2023, message='The year must be ' +
                              'less or equal than 2023')
        ])

    def __str__(self):
        return "Name: " + self.name + ", " + \
            "Type: " + self.type + ", " + \
            "Year: " + str(self.year)
