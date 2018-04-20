from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Column, Integer, String, Text, Float
from sqlalchemy.orm import relationship
from api import Base


class Park(Base):
    """
        The Park model
    """

    @declared_attr
    def __tablename__(self):
        # API endpoint will take the form '/api/__tablename__'
        return 'park'

    id = Column(Integer, primary_key=True)
    name = Column(String(64))
    city = Column(String(64))
    address = Column(Text)
    rating = Column(Float)
    google_id = Column(String(64))
    description = Column(Text)
    website = Column(Text)

    latitude = Column(Float(precision='32,12'))
    longitude = Column(Float(precision='32,12'))

    # define the relationship to park_photo (one-to-many)
    photos = relationship('Park_Photo', back_populates="park", cascade="all,delete")
    # define the relationship to truck (one-to-many)
    trucks = relationship('Truck', back_populates="park", cascade="all,delete")
    # define the relationship to park_review (one-to-many)
    reviews = relationship('Park_Review', back_populates="park", cascade="all,delete")

    # the helper function used in parkList resource
    def to_park_list_item(self):
        photos_list = []
        photos = self.photos
        n_photos = len(photos)
        if n_photos > 0:
            photo = photos[n_photos-1]
            photos_list.append({"id": photo.id, "url": photo.url})

        return {
            "address": self.address,
            "name": self.name,
            "photos": photos_list,
            "rating": self.rating,
            "id": self.id
        }
