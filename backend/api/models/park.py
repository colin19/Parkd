from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Column, Integer, String, Text, Float
from sqlalchemy.orm import relationship
from api import Base


class Park(Base):
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

    latitude = Column(Float)
    longitude = Column(Float)

    photos = relationship('Park_Photo', back_populates="park", cascade="all,delete")
    trucks = relationship('Truck', back_populates="park", cascade="all,delete")
    reviews = relationship('Park_Review', back_populates="park", cascade="all,delete")
