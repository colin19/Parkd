from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import ForeignKey, Column, Integer, Text
from sqlalchemy.orm import relationship
from api import Base


class Truck_Review(Base):
    """
        The Truck_Review model
    """

    @declared_attr
    def __tablename__(self):
        return 'truck_review'

    id = Column(Integer, primary_key=True)
    content = Column(Text)

    truck_id = Column(Integer, ForeignKey('truck.id'), nullable=False)

    # define the relationship to truck (one-to-many)
    truck = relationship('Truck', back_populates="reviews")
