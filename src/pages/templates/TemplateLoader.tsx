// src/components/TemplateLoader.tsx
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileService } from '../../services';
import { TemplateLoaderProps } from '../../interfaces/publicProfileData.interface';


const TemplateLoader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<TemplateLoaderProps | null>(null);
  type TemplateProps = { userData: TemplateLoaderProps };
  const [TemplateComponent, setTemplateComponent] = useState<React.LazyExoticComponent<React.FC<TemplateProps>> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (!id) return;

  const loadProfile = async () => {
    try {
      const publicProfile = await ProfileService.getPublicProfile(id);

      if (!publicProfile) {
        throw new Error('No se pudo obtener la información del perfil público');
      }

      const json = publicProfile as UserProfile;
      setUserData(json);

      switch (json.template_name) {
        case 'modern':
          setTemplateComponent(lazy(() => import('./Modern')));
          break;
        case 'creative':
          setTemplateComponent(lazy(() => import('./Creative')));
          break;
        case 'professional':
          setTemplateComponent(lazy(() => import('./Professional')));
          break;
        default:
          throw new Error(`Template "${json.template_name}" no reconocido`);
      }
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  };

  loadProfile();
}, [id]);


  if (error) {
    return (
      <div style={{ padding: '1rem', color: 'crimson' }}>
        ❌ {error}
      </div>
    );
  }

  if (!userData || !TemplateComponent) {
    return <div style={{ padding: '1rem' }}>Cargando perfil…</div>;
  }

  return (
    <Suspense fallback={<div style={{ padding: '1rem' }}>Cargando plantilla…</div>}>
      <TemplateComponent userData={userData} />
    </Suspense>
  );
};

export default TemplateLoader;
