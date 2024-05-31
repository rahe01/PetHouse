
import TeamCard from './TeamCard';
import teamJson from '../../../../../public/team.json';

const Team = () => {
  return (
    <div>
      <section className="py-6 dark:bg-gray-100 dark:text-gray-800">
        <div className="container p-4 mx-auto space-y-16 sm:p-10">
            <h1 className='text-3xl font-bold text-center '>Meet Our Team</h1>
          <div className="space-y-4">
            <h3 className="text-2xl font-medium leading-none sm:text-5xl">
            Meet our dynamic team, where innovation meets dedication, crafting solutions that redefine excellence.
            </h3>
           
          </div>
          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {teamJson.map((member, index) => (
              <TeamCard
                key={index}
                name={member.name}
                title={member.title}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
