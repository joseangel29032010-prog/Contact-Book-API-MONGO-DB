# Contact Book API

Este proyecto consiste en una API REST que utiliza MongoDB como base de datos para almacenar y administrar contactos. La información se guarda en una colección, donde cada contacto tiene datos como nombre, teléfono, correo electrónico, categoría y estado de favorito.

Se implementaron las operaciones CRUD para crear, consultar, actualizar y eliminar documentos de la base de datos. También se pueden realizar búsquedas por categoría y por estado de favorito.

Para trabajar con los datos se utilizaron agregaciones de MongoDB. Una permite agrupar y contar los contactos según su categoría, mientras que la otra permite conocer la cantidad de contactos favoritos y no favoritos.

Además, se creó un índice en el campo `category` para mejorar el rendimiento de las consultas que buscan contactos por categoría.

También se añadieron validaciones mediante Mongoose para controlar los datos que se guardan en la base de datos y evitar información incorrecta.# Contact Book API

Este proyecto consiste en una API REST que utiliza MongoDB como base de datos para almacenar y administrar contactos. La información se guarda en una colección, donde cada contacto tiene datos como nombre, teléfono, correo electrónico, categoría y estado de favorito.

Se implementaron las operaciones CRUD para crear, consultar, actualizar y eliminar documentos de la base de datos. También se pueden realizar búsquedas por categoría y por estado de favorito.

Para trabajar con los datos se utilizaron agregaciones de MongoDB. Una permite agrupar y contar los contactos según su categoría, mientras que la otra permite conocer la cantidad de contactos favoritos y no favoritos.

Además, se creó un índice en el campo `category` para mejorar el rendimiento de las consultas que buscan contactos por categoría.

También se añadieron validaciones mediante Mongoose para controlar los datos que se guardan en la base de datos y evitar información incorrecta.