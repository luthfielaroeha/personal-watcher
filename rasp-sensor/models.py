from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class BaseModel(db.Model):
    __abstract__ = True

    def __init__(self, *args):
        super().__init__(*args)

    def __repr__(self):
        return '%s(%s)' % (self.__class__.__name__, {
            column: value
            for column, value in self._to_dict().items()
        })

    def json(self):
        return {
            column: value if not isinstance(value, datetime.date) else value.strftime('%Y-%m-%d')
            for column, value in self._to_dict().items()
        }

class SensorData(BaseModel, db.Model):
    __tablename__ = 'sensordata'

    id = db.Column(db.Integer, primary_key = True)
    sensorid = db.Column(db.Integer)
    val = db.Column(db.Integer)
    time = db.Column(db.Integer)

    def __init__(self, sensorid, val, time):
        self.sensorid = sensorid
        self.val = val
        self.time = time

    def __repr__(self):
        return '<SensorData %r>' % (self.val)

class InvokedRule(BaseModel, db.Model):
    __tablename__ = 'invokedrule'

    id = db.Column(db.Integer, primary_key = True)
    ruleid = db.Column(db.Integer)
    data = db.Column(db.String)
    updatedat = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    isdeleted = db.Column(db.Boolean, default=False)

    def __init__(self, ruleid, data):
        self.ruleid = ruleid
        self.data = data

    def __repr__(self):
        return '<SensorData %r>' % (self.val)
