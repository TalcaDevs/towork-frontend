import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className=" mx-20 p-8">
        <h1 className="text-4xl font-extrabold text-[#0f172b] mb-6">
          Términos y Condiciones
        </h1>

        <p className="text-gray-700 mb-6">
          Bienvenido a <strong>ToWork</strong>, la plataforma especializada para estudiantes recién egresados
          que desean crear un portafolio y/o página web online en simples pasos. Al usar o acceder a los servicios
          de ToWork, aceptas cumplir y estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo
          con alguno de estos términos, por favor no uses nuestros servicios.
        </p>

        <h2 className="text-2xl font-semibold text-[#0f172b] mt-8 mb-3">
          1. Definiciones
        </h2>
        <p className="text-gray-700 mb-4">
          <strong>“Plataforma”</strong>: Hace referencia al sitio web y la aplicación de ToWork,
          mediante los cuales los usuarios crean y gestionan sus portafolios o páginas web. <br />
          <strong>“Usuario”</strong>: Cualquier persona que se registre o acceda a la Plataforma,
          incluyendo contenido, datos e información personal proporcionada. <br />
          <strong>“Contenido”</strong>: Todo texto, imágenes, código, archivos multimedia y demás
          materiales que el Usuario suba o genere dentro de la Plataforma. <br />
          <strong>“Nosotros” o “ToWork”</strong>: ToWork SpA, entidad que provee el servicio y administra
          la Plataforma.
        </p>

        <h2 className="text-2xl font-semibold text-[#0f172b] mt-8 mb-3">
          2. Aceptación de los Términos
        </h2>
        <p className="text-gray-700 mb-4">
          Al registrarte y usar ToWork, confirmas que has leído, comprendido y aceptado estos Términos
          y Condiciones en su totalidad. Si eres menor de edad, debes contar con la autorización de
          tu representante legal para aceptar estos términos y usar la Plataforma.
        </p>

        <h2 className="text-2xl font-semibold text-[#0f172b] mt-8 mb-3">
          3. Descripción del Servicio
        </h2>
        <p className="text-gray-700 mb-4">
          ToWork permite a estudiantes recién egresados crear un portafolio profesional o página web
          personal de forma sencilla, a través de plantillas prediseñadas, herramientas de edición visual
          y despliegue automático. Nuestros servicios incluyen, pero no se limitan a:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Selección y personalización de plantillas responsive.</li>
          <li>Gestión de dominios (conexión o compra de dominios propios).</li>
          <li>Almacenamiento seguro de imágenes, archivos y textos que el Usuario sube.</li>
          <li>Optimización SEO básica para portafolios.</li>
          <li>Acceso a estadísticas de visitas y analíticas básicas.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#0f172b] mt-8 mb-3">
          4. Uso del Servicio
        </h2>
        <p className="text-gray-700 mb-4">
          <strong>4.1.</strong> Cada Usuario es responsable de mantener la confidencialidad de sus credenciales de acceso. <br />
          <strong>4.2.</strong> El Usuario se compromete a no usar la Plataforma para:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Subir contenido ilegal, difamatorio o que infrinja derechos de terceros.</li>
          <li>Realizar actividades que puedan dañar, interferir o sobrecargar la infraestructura de ToWork.</li>
          <li>Compartir sus credenciales con terceros o permitir el acceso no autorizado.</li>
        </ul>
        <p className="text-gray-700 mb-4">
          <strong>4.3.</strong> Nos reservamos el derecho de suspender o eliminar cuentas que violen estos términos,
          sin previo aviso y sin que ello genere indemnización alguna.
        </p>

        <h2 className="text-2xl font-semibold text-[#0f172b] mt-8 mb-3">
          5. Registro y Cuenta de Usuario
        </h2>
        <p className="text-gray-700 mb-4">
          <strong>5.1.</strong> Para acceder a funcionalidades completas, el Usuario debe completar el formulario de
          registro y verificar su dirección de correo electrónico. <br />
          <strong>5.2.</strong> Al registrarse, el Usuario garantiza que la información proporcionada es veraz, actual
          y completa. Cualquier cambio deberá ser actualizado oportunamente en su perfil. <br />
          <strong>5.3.</strong> El Usuario es el único responsable de la seguridad de su cuenta y del uso que se le
          dé. ToWork no se hace responsable por accesos no autorizados si el Usuario no protege
          adecuadamente sus credenciales.
        </p>

        <h2 className="text-2xl font-semibold text-[#0f172b] mt-8 mb-3">
          6. Almacenamiento de Información y Privacidad
        </h2>
        <p className="text-gray-700 mb-4">
          <strong>6.1.</strong> ToWork almacena la información personal y los datos de los usuarios en bases de datos
          seguras, con protocolos de cifrado y controles de acceso restringido. <br />
          <strong>6.2.</strong> Los datos recopilados incluyen, pero no se limitan a: nombre completo, correo electrónico,
          información de contacto, portafolios, descripción personal, archivos subidos (imágenes,
          documentos), y métricas de uso. <br />
          <strong>6.3.</strong> Los datos no serán compartidos con terceros sin el consentimiento previo del Usuario,
          salvo requerimiento legal o para la prestación del servicio (por ejemplo, conexión con
          proveedores de hosting o APIs externas). <br />
          <strong>6.4.</strong> Para revisar nuestra Política de Privacidad completa y entender cómo gestionamos tus datos,
          visita la sección “Política de Privacidad” en nuestro sitio. <br />
          <strong>6.5.</strong> En caso de consultas o solicitudes sobre tus datos personales (acceso, rectificación,
          eliminación), contáctanos a{' '}
          <a href="mailto:talcadevs@gmail.com" className="text-blue-600 hover:underline">
            talcadevs@gmail.com
          </a>.
        </p>

        <h2 className="text-2xl font-semibold text-[#0f172b] mt-8 mb-3">
          7. Propiedad Intelectual
        </h2>
        <p className="text-gray-700 mb-4">
          <strong>7.1.</strong> Todos los derechos de propiedad intelectual relativos a la Plataforma (código fuente,
          estructuras, diseño, gráficos, logos, marcas, textos y demás elementos) son exclusivos de
          ToWork o de sus licenciantes. <br />
          <strong>7.2.</strong> El Usuario conserva la propiedad de los contenidos que sube o genera, pero concede a
          ToWork una licencia no exclusiva, libre de regalías, mundial y sublicenciable para alojar,
          reproducir, modificar y presentar dichos contenidos con el fin de prestar el servicio. <br />
          <strong>7.3.</strong> Queda prohibido copiar, distribuir, modificar o extraer elementos de la Plataforma
          sin autorización previa por escrito de ToWork.
        </p>

        <h2 className="text-2xl font-semibold text-[#0f172b] mt-8 mb-3">
          8. Exención de Responsabilidad
        </h2>
        <p className="text-gray-700 mb-4">
          <strong>8.1.</strong> ToWork proporciona la Plataforma “tal cual” y “según disponibilidad”. No garantizamos
          que el servicio funcione sin errores o interrupciones, ni que los resultados cumplan con las
          expectativas específicas de cada Usuario. <br />
          <strong>8.2.</strong> ToWork no se hace responsable de daños directos, indirectos, incidentales, consecuentes
          o punitivos derivados del uso o imposibilidad de uso de la Plataforma, incluso si hemos sido
          advertidos de la posibilidad de tales daños. <br />
          <strong>8.3.</strong> El Usuario es responsable de mantener copias de seguridad de sus contenidos. ToWork no
          responde por pérdidas de datos debido a fallos técnicos, ataques externos o errores del Usuario.
        </p>

        <h2 className="text-2xl font-semibold text-[#0f172b] mt-8 mb-3">
          9. Modificaciones a los Términos
        </h2>
        <p className="text-gray-700 mb-4">
          <strong>9.1.</strong> ToWork se reserva el derecho de modificar estos Términos y Condiciones en cualquier
          momento. Las versiones actualizadas se publicarán en esta misma página con fecha de última
          actualización. <br />
          <strong>9.2.</strong> Si realizamos cambios sustanciales, te notificaremos por correo electrónico o mediante
          un aviso prominente en la Plataforma. El uso continuado después de la publicación de cambios
          implica tu aceptación de los nuevos términos.
        </p>

        <h2 className="text-2xl font-semibold text-[#0f172b] mt-8 mb-3">
          10. Ley Aplicable y Jurisdicción
        </h2>
        <p className="text-gray-700 mb-4">
          Estos Términos se rigen por la legislación vigente en la República de Chile. En caso de
          controversias derivadas de la interpretación o cumplimiento de estos Términos, las partes
          se someten a la jurisdicción de los tribunales competentes en Santiago de Chile, renunciando
          a cualquier otro fuero que pudiera corresponderles.
        </p>

        <h2 className="text-2xl font-semibold text-[#0f172b] mt-8 mb-3">
          11. Contacto
        </h2>
        <p className="text-gray-700 mb-4">
          Si tienes dudas, comentarios o consultas sobre estos Términos y Condiciones, o sobre el uso
          de tus datos personales, escríbenos a:{' '}
          <a href="mailto:talcadevs@gmail.com" className="text-blue-600 hover:underline">
            talcadevs@gmail.com
          </a>
        </p>

        <p className="text-sm text-gray-500 mt-8">
          <em>Última actualización: 1 de junio de 2025</em>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
