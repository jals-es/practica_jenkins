pipeline {
  agent any
  stages {
    stage('linter') {
      steps {
        sh '''npm install
npm run lint
npm start &'''
      }
    }

    stage('test') {
      steps {
        sh 'npx cypress run'
      }
    }

  }
  environment {
    ejecutor = 'Juan Antonio'
    motivo = 'Porque me obliga pepe'
    correo = 'narzano.nar@gmail.com'
  }
}