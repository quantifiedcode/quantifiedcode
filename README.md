# Welcome to QuantifiedCode!

QuantifiedCode is a code analyis \& automation platform. It helps you to keep track of issues and
metrics in your software projects, and can be easily extended to support new types of analyses.
The application consists of several parts:

* A frontend, realized as a React.js app
* A backend, realized as a Flask app, that exposes a REST API consumed by the frontend
* A background worker, realized using Celery, that performs the code analysis

# Installation

We provide several options for installing QuantifiedCode. Which one is the right one for you
depends on your use case.

* The **manual installation** is best if you want to modify or change QuantifiedCode 
* The **Docker-based installation** is probably the easiest way to try QuantifiedCode without much work
* The **Ansible-based installation** is the most suitable way if you want to run QuantifiedCode in
  a professional infrastructure (possibly with multiple servers)

The following section will only discuss the manual installation process, for the other options please
check their corresponding repositories.

## Manual Installation

The installation consists of three parts:

* Install the dependencies required to run QuantifiedCode
* Download the required source code
* Set up the configuration

### Installing Dependencies

QuantifiedCode requires the following external dependencies:

* A message broker (required for the background tasks message queue). We recommend either RabbitMQ or Redis.
* A database (required for the core application). We recommend PostgreSQL, but SQLite is supported as well. Other database systems might work too (e.g. MySQL), but are currently not officially supported. If you need to run QuantifiedCode on a non-supported database, please get in touch with us and we'll be happy to provide you some guidance.

### Download the QuantifiedCode source code

Now with the dependencies installed, we can go ahead and download QuantifiedCode:

    git clone git@github.com:quantifiedcode/quantifiedcode.git

### Set up a virtual environment (optional)

In addition, it is advised to create a (Python 2.7) virtual environment to run QuantifiedCode in:

    virtualenv venv

    #activate the virtual environment
    source venv/bin/activate

### Install the required Python packages

QuantifiedCode manages dependencies via the Python package manager, pip. To install them, simply run

    pip install -r requirements.txt

### Edit Settings

QuantifiedCode gets configured via YAML settings files. When starting up the application, it incrementally loads settings from several files, recursively updating the settings object. First, it will load default settings from `quantifiedcode/settings/default.yml`. Then, it will check if a `QC_SETTINGS` environment variable is defined and points to a valid file, and if so it will load settings from it (possibly overwriting default settings). If not, it will look for a `settings.yml` file in the current working
directory and load settings from there. Additionally, it will check if a `QC_SECRETS` environment variable is defined and points to a valid file, and also load settings from there (this is useful for sensitive settings that should be kept seperate from the rest [e.g. to not check them into version control]).

There is a sample `settings.yml` file in the root of the repository that you can start from.

### Running the Setup

After editing your settings, run the setup command via

    #run from the root directory of the repository
    python manage.py setup

The setup assistant will iteratively walk you through the setup, and when finished you should have a
working instance of QuantifiedCode!

### Running the web application

To run the web application, simply run

    python manage.py runserver

### Running the background worker

To run the background worker, simply run

    python manage.py runworker

## Docker-Based Installation

Coming Soon!

## Ansible-Based Installation

Coming Soon!