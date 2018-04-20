from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import ForeignKey, Column, Integer, String, Float, Text
from sqlalchemy.orm import relationship
from api import Base


class Truck(Base):
    """
        The Truck model
    """

    @declared_attr
    def __tablename__(self):
        return 'truck'

    id = Column(Integer, primary_key=True)
    name = Column(String(64))

    city = Column(String(64))
    address = Column(Text)
    rating = Column(Float)
    google_id = Column(String(64))

    description = Column(Text)
    website = Column(Text)
    cuisine = Column(String(64))

    latitude = Column(Float(precision='32,12'))
    longitude = Column(Float(precision='32,12'))

    park_id = Column(Integer, ForeignKey('park.id'), nullable=False)

    # define the relationship to park (many-to-one)
    park = relationship('Park', back_populates="trucks")
    # define the relationship to truck_review (one-to-many)
    reviews = relationship('Truck_Review', back_populates="truck", cascade="all,delete")
    # define the relationship to truck_photo (one-to-many)
    photos = relationship('Truck_Photo', back_populates="truck", cascade="all,delete")

    # the helper function used in truckList resource
    def to_truck_list_item(self):
        photos_list = []
        photos = self.photos
        n_photos = len(photos)
        if n_photos > 0:
            photo = photos[n_photos-1]
            photos_list.append({"id": photo.id, "url": photo.url})

        reviews_list = []
        reviews = self.reviews
        n_reviews = len(reviews)
        if n_reviews > 0:
            review = reviews[n_reviews - 1]
            reviews_list.append({"id": review.id, "content": review.content})

        return {
            "address": self.address,
            "name": self.name,
            "photos": photos_list,
            "rating": self.rating,
            "id": self.id,
            "reviews": reviews_list
        }
