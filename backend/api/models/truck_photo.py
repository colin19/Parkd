from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import ForeignKey, Column, Integer, Text
from sqlalchemy.orm import relationship
from api import Base


class Truck_Photo(Base):
    @declared_attr
    def __tablename__(self):
        return 'truck_photo'

    id = Column(Integer, primary_key=True)
    url = Column(Text)

    truck_id = Column(Integer, ForeignKey('truck.id'), nullable=False)

    truck = relationship('Truck', back_populates='photos')
