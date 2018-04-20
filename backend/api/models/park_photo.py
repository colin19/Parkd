from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import ForeignKey, Column, Integer, Text, String
from sqlalchemy.orm import relationship
from api import Base


class Park_Photo(Base):
    """
        The Park_Photo model
    """

    @declared_attr
    def __tablename__(self):
        return 'park_photo'

    id = Column(Integer, primary_key=True)
    url = Column(Text)

    tag = Column(String(128))
    description = Column(Text)
    likes = Column(Integer)

    park_id = Column(Integer, ForeignKey('park.id'), nullable=False)

    # define the park-park_photo relation (one-to-many)
    park = relationship('Park', back_populates="photos")
