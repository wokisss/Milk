# 智慧鲜奶供应链 - 一体化系统

本项目将三个独立的应用程序集成到一个统一的、内聚的鲜奶供应链管理系统中。这三个应用分别是：

1.  **消费者端 (Project 3 - Node.js):** 为消费者提供产品溯源功能。
2.  **监管端 (Project 2 - FastAPI):** 政府监管核心系统，同时定义了数据库结构。
3.  **收购端 (Project 1 - Flask):** 用于从牧民处收购鲜奶的系统。

## 系统架构

三个项目现已互联互通，并共享一个名为 `smart_milk_chain` 的 MySQL 数据库。

*   **后端服务:**
    *   **监管端 (FastAPI):** 运行于 `http://localhost:8000`。这是主服务，并负责管理数据库结构。
    *   **收购端 (Flask):** 运行于 `http://localhost:5000`。它连接到共享数据库来管理牧民和收购数据。
    *   **消费者端 (Node.js):** 运行于 `http://localhost:3001`。它从共享数据库提供产品溯源信息。
*   **前端服务:**
    *   **监管端 (React):** 运行于 `http://localhost:5173`。这是监管系统的用户界面。
*   **数据库:**
    *   所有后端服务都使用一个名为 `smart_milk_chain` 的 MySQL 数据库。

## 环境准备

*   **Node.js:** 消费者端后端和监管端前端需要。
*   **Python:** 收购端和监管端后端需要。
*   **MySQL:** 需要一个正在运行并且可访问的 MySQL 服务器。

## 安装与设置

1.  **数据库设置:**
    *   确保您的 MySQL 服务器正在运行。
    *   创建一个名为 `smart_milk_chain` 的新数据库。
        ```sql
        CREATE DATABASE smart_milk_chain;
        ```
    *   数据库连接凭证已设置为：
        *   **主机**: `localhost`
        *   **端口**: `3306`
        *   **用户**: `root`
        *   **密码**: `123456`
    *   如果您的凭证不同，您必须更新每个项目中的数据库配置文件：
        *   `project1/milkpurchase/config.py`
        *   `project2/backend/database.py`
        *   `project3/backend/config/database.js`

2.  **安装依赖:**
    *   **项目 1 (Flask - 收购端):**
        ```bash
        pip install -r requirements-project1.txt
        ```
    *   **项目 2 (FastAPI - 监管端):**
        ```bash
        pip install -r requirements-project2.txt
        ```
    *   **项目 2 (React - 前端):**
        ```bash
        cd project2
        npm install
        cd ..
        ```
    *   **项目 3 (Node.js - 消费者端):**
        ```bash
        cd project3/backend
        npm install
        cd ../..
        ```

## 启动系统

项目提供了一个便捷的批处理脚本，可以同时启动所有服务。

```bash
./start_system.bat
```

这将为以下每个服务打开四个新的命令提示符窗口：

*   项目 2 后端 (FastAPI)
*   项目 2 前端 (React)
*   项目 1 后端 (Flask)
*   项目 3 后端 (Node.js)

该脚本还会为每个服务自动安装所需的依赖项。
