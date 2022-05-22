import unittest
import os
from app import app, db
from app.models import User, Rank, GamePool
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.orm.session import Session


class StudentModelCase(unittest.TestCase):

    def setUp(self):
        app.config.from_object('config.TestingConfig')
        db.init_app(app)
        db.create_all()
        user1 = User(username='Yaoming', email='Yao@lol.com')
        user2 = User(username='James', email='James@lol.com')
        db.session.add(user1)
        db.session.add(user2)
        
        user1_rank = Rank(seconds =10, moves=10)
        user2_rank = Rank(seconds =10, moves=10)
        db.session.add(user1_rank)
        db.session.add(user2_rank)

        gamepool1 = GamePool(numbase_array='1,2,3,4,5,6,7,8,9')
        gamepool2 = GamePool(numbase_array='1,2,3,4,5,6,7,9,8')
        db.session.add(gamepool1)
        db.session.add(gamepool2)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_password_hashing(self):
        testuser = User.query.get(1)
        testuser.set_password('yaoming')
        self.assertFalse(testuser.check_password('james'))
        self.assertTrue(testuser.check_password('yaoming'))

    def test_confit(self):
        app.config.from_object('config.TestingConfig')
        self.assertTrue(app.config['SECRET_KEY']== os.environ.get('SECRET_KEY') or 'sshh!')


    def test_user_database(self):
        users = User.query.all()
        n = 0
        for u in users:
            n += 1
        self.assertTrue(n == 2)

    def test_rank_database(self):
        ranks = Rank.query.all()
        n = 0
        for r in ranks:
            n += 1
        self.assertTrue(n == 2)

    def test_gamepool_database(self):
        games = GamePool.query.all()
        n = 0
        for g in games:
            n += 1
        self.assertTrue(n == 2)


if __name__ == '__main__':
    unittest.main(verbosity=2)
