from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import ForeignKey, Column, Integer, String, Float, Text
from sqlalchemy.orm import relationship
from api import Base


class Truck(Base):
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

    park = relationship('Park', back_populates="trucks")
    reviews = relationship('Truck_Review', back_populates="truck", cascade="all,delete")
    photos = relationship('Truck_Photo', back_populates="truck", cascade="all,delete")
