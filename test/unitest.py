import unittest, os
from app import app, db
from app.models import User

class UserModelCase(unittest.TestCase):

  def setUp(self):
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI']=\
        'sqlite:///'+os.path.join(basedir,'test.db')
    self.app = app.test_client()#creates a virtual test environment
    db.create_all()
    u = User(username='susan',email='cat@gmail.com')

    db.session.add(u)
    db.session.commit()

  def tearDown(self):
    db.session.remove()
    db.drop_all()

  def test_password_hashing(self):
    s = User.query.get('susan')
    s.set_password('test')
    #self.assertFalse(s.check_password('case'))
    #self.assertTrue(s.check_password('test'))

if __name__=='__main__':
  unittest.main(verbosity=2)


