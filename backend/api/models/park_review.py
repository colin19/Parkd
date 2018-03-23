from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import ForeignKey, Column, Integer, Text
from sqlalchemy.orm import relationship
from api import Base


class Park_Review(Base):
    @declared_attr
    def __tablename__(self):
        return 'park_review'

    id = Column(Integer, primary_key=True)
    content = Column(Text)

    park_id = Column(Integer, ForeignKey('park.id'), nullable=False)

    park = relationship('Park', back_populates="reviews")
