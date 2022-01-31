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
sleep 10'''
        script {
          env.TEST = sh(script: "./node_modules/.bin/cypress run ",returnStatus:true)
        }

      }
    }

    stage('updateReadme') {
      steps {
        sh 'node ./jenkinsScripts/update_readme.js $TEST'
      }
    }

  }
  environment {
    ejecutor = 'Juan Antonio'
    motivo = 'Porque me obliga pepe'
    correo = 'narzano.nar@gmail.com'
  }
}