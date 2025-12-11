#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
数据库测试脚本
用于验证数据库是否正确初始化
"""

from app import app, db, User
from werkzeug.security import generate_password_hash

def test_database():
    with app.app_context():
        # 创建所有表
        db.create_all()
        print("数据库表创建完成")
        
        # 检查是否存在admin用户
        admin_user = User.query.filter_by(username='admin').first()
        if admin_user:
            print(f"管理员用户已存在: {admin_user.username}")
            print("测试密码验证...")
            if admin_user.check_password('admin123'):
                print("密码验证成功!")
            else:
                print("密码验证失败!")
        else:
            print("管理员用户不存在，正在创建...")
            admin_user = User(username='admin', role='admin')
            admin_user.set_password('admin123')
            db.session.add(admin_user)
            db.session.commit()
            print("管理员用户创建完成")
        
        # 列出所有用户
        users = User.query.all()
        print(f"系统中共有 {len(users)} 个用户:")
        for user in users:
            print(f"  - {user.username} ({user.role})")

if __name__ == '__main__':
    test_database()