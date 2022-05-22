import unittest, os, time
from app import app, db
from app.models import User, Rank, GamePool
from selenium import webdriver
basedir = os.path.abspath(os.path.dirname(__file__))



class SystemTest(unittest.TestCase):
  driver = None
  
  def setUp(self):
    self.driver = webdriver.Firefox(executable_path=os.path.join(basedir,'geckodriver'))

    if not self.driver:
      self.skipTest('Web browser not available')
    else:
      
        app.config.from_object('config.TestingConfig')
        db.init_app(app)
        db.create_all()
        morty = User(username='morty',email='happy@lol.com')
        morty.set_password('cat')
        db.session.add(morty)
        db.session.commit()
        rick = User(username='rick',email='sad@lol.com')
        rick.set_adminkey("adminkey")
        rick.set_password("dog")
       
     
        db.session.add(rick)
        db.session.commit()
        self.driver.maximize_window()
        self.driver.get('http://127.0.0.1:5000')
        # time.sleep(1000)

  def tearDown(self):
        self.driver.close()
        db.session.query(User).delete()
        db.session.query(Rank).delete()
        db.session.query(GamePool).delete()
        db.session.commit()
        db.session.remove()
        db.drop_all()

       

  def test_register(self):
    
    self.driver.get('http://localhost:5000/register')
    self.driver.implicitly_wait(5)
    username = self.driver.find_element_by_id('username')
    username.send_keys('tim')
    email = self.driver.find_element_by_id('email')
    email.send_keys('happy5505@lol.com')
    password = self.driver.find_element_by_id('password')
    password.send_keys('5505')
    password2 = self.driver.find_element_by_id('password2')
    password2.send_keys('5505')
    adminkey = self.driver.find_element_by_id('adminkey')
    adminkey.send_keys('adminkey')
    time.sleep(1)
    self.driver.implicitly_wait(5)
    submit = self.driver.find_element_by_id('submit')
    submit.click()
    #check login success
    self.driver.implicitly_wait(5)
    time.sleep(1)

  def test_signin(self):
    
    self.driver.get('http://localhost:5000/login')
    self.driver.implicitly_wait(5)
    username = self.driver.find_element_by_id('username')
    username.send_keys('tim')
    password = self.driver.find_element_by_id('password')
    password.send_keys('5505')
    time.sleep(1)
    self.driver.implicitly_wait(5)
    submit = self.driver.find_element_by_id('submit')
    submit.click()
    self.driver.implicitly_wait(5)
    time.sleep(1)
    game  = self.driver.find_element_by_partial_link_text('Game')
    game.click()
    time.sleep(5)


if __name__=='__main__':
  unittest.main(verbosity=2)



