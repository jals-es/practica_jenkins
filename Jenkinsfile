pipeline {
  agent any
  triggers { 
    pollSCM('0 */3 * * *') 
  }
  stages {
    stage('linter') {
      steps {
        sh '''npm install
npm run build'''
        script {
          env.LINT = sh(script: "npm run lint",returnStatus:true)
        }
      }
    }

    stage('test') {
      steps {
        sh '''npm start &'''
        script {
          env.TEST = sh(script: "./node_modules/.bin/cypress run ",returnStatus:true)
        }

      }
    }

    stage('updateReadme') {
      steps {
        script {
          env.UPDATEREADME = sh(script: 'node ./jenkinsScripts/update_readme.js $TEST',returnStatus:true)
        }
      }
    }

    stage('pushChanges') {
      steps {
        sh 'git add --all'
        sh '''git config --global user.email "juan.antonio.lis@gmail.com"
git config --global user.name "Juan Antonio"
git remote set-url origin "https://jals-es:"$ghtoken"@github.com/jals-es/practica_jenkins.git"'''
        sh 'git commit -m "Pipeline ejecutada por $ejecutor. Motivo: $motivo"'
        sh 'git pull'
        sh 'git push --set-upstream origin master'
        script {
          env.PUSHCHANGES = 0
        }
      }
    }

    stage('Vercel') {
      steps {
        sh '''
if [ $LINT -eq 0 ] && [ $TEST -eq 0 ] && [ $UPDATEREADME -eq 0 ] && [ $PUSHCHANGES -eq 0 ]
then
vercel . --token $VERCELTOKEN --confirm --name practica-jenkins
echo $?
else
exit 1
fi
        '''
        script {
          env.VERCEL = 0
        }
      }
    }
    stage('Parallel Stage') {
      parallel {
        stage('Mail Notification') {
          sh '''node ./jenkinsScripts/send_email.js'''
        }

        stage('Custom stage Telegram Notification') {
          sh '''node ./jenkinsScripts/send_telegram.js'''
        }
      }
    }

  }
  environment {
    ejecutor = 'Juan Antonio'
    motivo = 'Porque me obliga pepe'
    correo = 'narzano.nar@gmail.com'
    ghtoken = credentials('ghtokeni')
    VERCELTOKEN = credentials('VERCELTOKEN')
    EMAIL_HOST = credentials('EMAIL_HOST')
    EMAIL_POST = credentials('EMAIL_POST')
    EMAIL_USER = credentials('EMAIL_USER')
    EMAIL_PASS = credentials('EMAIL_PASS')
    TELEGRAM_BOT_TOKEN = credentials('TELEGRAM_BOT_TOKEN')
    MY_TELEGRAM_ID = credentials('MY_TELEGRAM_ID')
  }
}
