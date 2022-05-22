import unittest, os
from app import app, db
from app.models import User,Rank,GamePool

class StudentModelCase(unittest.TestCase):

  def setUp(self):
    basedir = os.path.abspath(os.path.dirname(__file__))
    self.app = app.test_client()#creates a virtual test environment
    app.config.from_object('config.TestingConfig')
    db.init_app(app)
    db.create_all()
    s1 = User(username='Case',email='ww@123.com')
    s2 = User(username='Case1',email='ww@1234.com')
    db.session.add(s1)
    db.session.add(s2)
    db.session.commit()

  def tearDown(self):
    db.session.remove()
    db.drop_all()

  def test_password_hashing(self):
    s = User.query.get(1)
    s.set_password('test')
    self.assertFalse(s.check_password('case'))
    self.assertTrue(s.check_password('test'))


if __name__=='__main__':
  unittest.main(verbosity=2)