Example of nextjs project using Cypress.io

<!---Start place for the badge -->
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

<!---End place for the badge -->

# Practica Jenkins
Por Juan Antonio López Seguí

## Objetivo
En esta practica crearemos una pipeline con un jenkinsfile el cual ejecutaremos sobre un proyecto NEXT.js con los siguientes requisitos:

[- Trigger](#trigger)<br/>
[- Environment](#env)<br/>
[- Stage Linter](#linter)<br/>
[- Stage Test Cypress](#test)<br/>
[- Stage Update Readme](#updatereadme)<br/>
[- Stage Push Changes](#pushchanges)<br/>
[- Stage Vercel](#vercel)<br/>
[- Stage Mail Notification](#mailnotify)<br/>
[- Stage Telegram Notification](#telegramnotify)<br/>

<a name="trigger"></a>
## Trigger
Añadimos un trigger para que cada 3 horas verifique si hay algun cambio en el repositorio y en caso afirmativo ejecute la pipeline. Para ello usamos la opción ```pollSMC``` con el valor ```'0 */3 * * *'``` para indicarle que se ejecuta cada 3 horas.

![jenkinsfile triggers](https://user-images.githubusercontent.com/31510870/151905262-0d46dec2-e4cf-4992-b5ea-4f0d252acbe1.png)

<a name="env"></a>
## Environment
Declaramos las variables de entorno fijas que nos piden en la practica y llamamos a las credenciales secretas que tenemos configuradas en jenkins. Las declaramos para usarlas en los stages en los que se requieran. Al configurarlas como variables de entorno nos aseguramos que los scripts que hacemos con node las cogen mediande el uso de ```process.env.NOMBREVARIABLE```, pero si usamos otro tipo de lenguaje como shell scripts tambien las pueden coger.

![enviroment](https://user-images.githubusercontent.com/31510870/151905598-7d6cd8f2-bd2e-4b31-b3f0-309c1a6659ac.png)

<a name="linter"></a>
## Stage Linter
En este stage al ser el primero hacemos el ```npm install``` para instalar las dependencias, el ```npm run build``` que nos hace falta para los tests de cypress, y ejecutamos los tests de linter con ```npm run lint```. Estos tests de linter nos devuelven unos fallos cuando los ejecutamos por primera vez, asi que para continuar los tenemos que solucionar.<br/>
Guardamos el resultado en una variable de entorno para usar su resultado mas adelante.

![stage linter](https://user-images.githubusercontent.com/31510870/151906017-d1e49a54-2868-4c81-919f-2e6cd1d2d5a5.png)
![success linter](https://user-images.githubusercontent.com/31510870/151906024-33f785eb-cd66-4f47-903f-12f2d1fe2186.png)

<a name="test"></a>
## Stage Test Cypress
Ejecutamos los tests de cypress con el comando ```./node_modules/.bin/cypress run```, lo que nos obliga a tener iniciado el servidor por lo que ejecutamos antes en segundo plano ```npm start &```<br/>
Guardamos el resultado en una variable de entorno para usar su resultado mas adelante.

![stage test](https://user-images.githubusercontent.com/31510870/151906263-2bd4e327-891d-441e-949e-986735e2cb3d.png)
![success test](https://user-images.githubusercontent.com/31510870/151906279-b80f7e48-a851-4cee-8791-3958d7197b06.png)

<a name="updatereadme"></a>
## Stage Update Readme
En esta stage recogemos el valor de la variable de entorno declarada en la stage aterior con el resultado de los tests de cypress y ejecutamos un script propio de node en el que cambiamos el badge del Readme.md dependiendo de si los tests han sido correctos o no.<br/>
Guardamos el resultado en una variable de entorno para usar su resultado mas adelante.

* En la siguiente stage [State Push Changes](#pushchanges) muestro como se cambia el badge.

![stage updateReadme](https://user-images.githubusercontent.com/31510870/151906552-9fd563b5-efcf-4b8b-ac49-02146c0350dd.png)
![script update readme](https://user-images.githubusercontent.com/31510870/151906537-6f9fdfbe-ca43-4936-9b0f-a6f3fac39ce0.png)

<a name="pushchanges"></a>
## Stage Push Changes
En esta stage tenemos que añadir los cambios que se han hecho en la stage anterior, hacer el commit y subirlos a GitHub para poder ver como se ha cambiado el badge del readme.<br/>

Añadimos todos los archivos.<br/>
```git add --all```

Configuramos el usuario.<br/>
```
git config --global user.email "juan.antonio.lis@gmail.com"
git config --global user.name "Juan Antonio"
```

Configuramos la url de GitHub con la variable de entorno que hace referencia a una credencial con nuestro token de GitHub.<br/>
```git remote set-url origin "https://jals-es:"$ghtoken"@github.com/jals-es/practica_jenkins.git"```

Hacemos el commit haciendo referencia a las 2 variables de entorno del ejecutor y el motivo.<br/>
```git commit -m "Pipeline ejecutada por $ejecutor. Motivo: $motivo```

Hacemos el pull por si hay algun cambio mientras se ha ejecutado la pipeline.<br/>
```git pull```

Hacemos el push al origin master.<br/>
```git push --set-upstream origin master'```

![stage pushChanges](https://user-images.githubusercontent.com/31510870/151907445-7ca773f8-f0b4-4843-9d87-f5222c55cf4a.png)
![resultado update readme](https://user-images.githubusercontent.com/31510870/151906539-a5688d38-01ee-4c6f-afc4-08e2c44434c7.png)
![success push changes](https://user-images.githubusercontent.com/31510870/151907463-49b766a1-535c-4f1b-bfbb-493ebd09d715.png)

<a name="vercel"></a>
## Stage Vercel
En esta stage recogemos todas las variables de entorno de los anteriores stages y si todos son correctos hacemos el deploy en vercel de nuestra aplicacion de NEXT. Para ello necesitamos coger tambien la variable de entorno que contiene la credencial del token de nuestra cuenta de vercel.

![stage vercel](https://user-images.githubusercontent.com/31510870/151907656-b5d47769-38a0-4193-8fb7-507be8c8bf69.png)
![vercel deploy](https://user-images.githubusercontent.com/31510870/151907665-ca5f8e55-3da2-4207-8580-8e4ffc6b7c8f.png)
![success vercel](https://user-images.githubusercontent.com/31510870/151907678-6c04c749-429c-4f6c-b8a7-3bdbe6353e56.png)

<a name="mailnotify"></a>
## Stage Mail Notification
En esta stage informamos por correo del resultado de las stages, para ello usamos la libreria nodemailer y configuramos el smtp para el envio del correo. Como tenemos los datos de smtp en credenciales de jenkins, cogemos las variables de entorno que contienen dichas credenciales.<br>
En el cuerpo del correo cogemos tambien las variables de entorno que contienen los resultados de las anteriores stages.<br>
En la ultima captura vemos como se ha enviado el correo.

![script send email](https://user-images.githubusercontent.com/31510870/151908219-8e796002-333d-4ca6-93cc-34926584d4ed.png)
![resultado correo](https://user-images.githubusercontent.com/31510870/151908238-7f21df93-d9e2-48cf-ab3d-3ef4872a2311.png)

<a name="telegramnotify"></a>
## Stage Telegram Notification
En paralelo a la anterior stage ejecutamos otra stage en la que enviamos una confirmación por un bot de telegram de que la stage se ha ejecutado correctamente saludando al ejecutor de la pipeline.<br>
En la captura se puede ver el mensaje de telegram.

![script send telegram](https://user-images.githubusercontent.com/31510870/151908260-1741bded-fae7-49a8-a78f-fcee7353d4e7.png)
![resultado telegram](https://user-images.githubusercontent.com/31510870/151908270-e034a770-224d-401f-9350-d0fe936a88b8.png)

## Stages anteriores en paralelo y resultado
Aqui podemos ver como se ejecutan las dos stages en paralelo y el resultado de toda la pipeline ejecutada correctamente en el dashboard de Blue Oceans que hemos instalado y configurado para poder gestionar la pipeline con mayor facilidad.

![stage parallel mail telegram](https://user-images.githubusercontent.com/31510870/151908388-8782c0d3-e58c-49b9-bc30-12d169608ed2.png)
![resultado todo ok](https://user-images.githubusercontent.com/31510870/151908401-8b914b95-09dd-4cf2-8b52-b1ca4476d754.png)


<u>Autor: Juan Antonio López Seguí</u>
