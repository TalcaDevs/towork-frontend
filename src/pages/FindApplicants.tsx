import React, { useEffect, useState } from 'react';
import SearchInput from '../components/SearchInput';
import Title from '../components/ui/Title';
import ApplicantCard from '../components/applicants/ApplicantCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ProfileService } from '../services';
import { PublicProfileInfo } from '../services/interface/profile.interface';

const FindApplicants: React.FC = () => {
  const [profiles, setProfiles] = useState<PublicProfileInfo[]>([]);
  const [filtered, setFiltered] = useState<PublicProfileInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await ProfileService.getPublicProfiles();
        setProfiles(data);
        setFiltered(data);
      } catch (error) {
        console.error('Error al obtener perfiles públicos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSearch = (query: string) => {
    const q = query.toLowerCase();
    const result = profiles.filter((p) => {
      const fullName = `${p.first_name} ${p.last_name}`.toLowerCase();
      const skills = Array.isArray(p.skills)
        ? p.skills
            .map((s: any) =>
              typeof s === 'string' ? s : s.skill?.name || s.name
            )
            .join(' ')
            .toLowerCase()
        : '';
      return (
        fullName.includes(q) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.role && p.role.toLowerCase().includes(q)) ||
        skills.includes(q)
      );
    });
    setFiltered(result);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f7f9]">
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 space-y-8">
          <div className="max-w-xl space-y-4">
            <Title size="md" weight="bold">
              Buscar Talentos
            </Title>
            <SearchInput
              placeholder="Buscar por nombre, habilidad o ubicación"
              onSearch={handleSearch}
            />
          </div>
          {loading ? (
            <div className="flex justify-center mt-10">
              <LoadingSpinner size={8} color="text-blue-600" />
            </div>
          ) : (
            <>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((profile) => (
                    <ApplicantCard key={profile.id} profile={profile} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No se encontraron perfiles.</p>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default FindApplicants;
