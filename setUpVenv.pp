# set un avirtual envirement that satisfy my requirement for the 
# Hbnb clone project
# puppet apply 101-setup_web_static.pp


$venv = 'venv2'

exec { 'essential':
  command => 'sudo apt-get install libffi-dev install libssl-dev  build-essential',
  path    => '/usr/bin/:/usr/local/bin/:/bin/';
}->
package { 'virtualenv':
  ensure   => present,
  provider => apt;
} ->
exec { "create/activate ${venv})":
  command => "virtualenv ${venv}; source ${venv}/",
  path    => '/usr/bin/:/usr/local/bin/:/bin/';
} ->
exec { 'fabrik':
  command => 'pip3 install pyparsing appdirs setuptools==40.1.0 cryptography==2.8 bcrypt==3.1.7 PyNaCl==1.3.0 Fabric3==1.14.post1',
  path    => '/usr/bin/:/usr/local/bin/:/bin/';
} ->
exec { 'flask':
  command => 'pip3 install flask flask_cors',
  path    => '/usr/bin/:/usr/local/bin/:/bin/';
} ->
exec { 'essential sql':
  command => 'sudo apt-get install libmysqlclient-dev zlib1g-dev',
  path    => '/usr/bin/:/usr/local/bin/:/bin/';
} ->
exec { 'sqlalchemy':
  command => 'pip3 install mysqlclient SQLAlchemy',
  path    => '/usr/bin/:/usr/local/bin/:/bin/';
}->
package { 'python3-lxml':
  ensure   => present,
  provider => apt;
} ->
exec { 'flasgger':
  command => 'pip3 install flasgger',
  path    => '/usr/bin/:/usr/local/bin/:/bin/';
}->
exec { 'pep8':
  command => 'pip3 install pep8 autopep8',
  path    => '/usr/bin/:/usr/local/bin/:/bin/';
}->
