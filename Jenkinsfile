pipeline {
  agent any
  stages {
    stage('linter') {
      steps {
        sh '''npm install
npm run build
npm run lint'''
      }
    }

    stage('test') {
      steps {
        sh '''npm start &
cypress run'''
      }
    }

  }
  environment {
    ejecutor = 'Juan Antonio'
    motivo = 'Porque me obliga pepe'
    correo = 'narzano.nar@gmail.com'
  }
}