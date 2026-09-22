import { getPublishedCourses, Course } from '@/lib/notion';
import { Mail, Calendar, MapPin, Users } from 'lucide-react';

export const revalidate = 60; // Revalidate the page every 60 seconds

export default async function Home() {
  const courses = await getPublishedCourses();

  return (
    <div className="max-w-6xl mx-auto px-8 py-16">
      
      {/* Hero Section */}
      <section className="mb-20 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-serif text-sirius-green mb-6 leading-tight">
          A living curriculum for a regenerative culture.
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to the Sirius Bioregional Learning Center. We offer community-led courses, workshops, and immersions grounded in ecological stewardship, mutual aid, and dharmic practice.
        </p>
      </section>

      {/* Course Catalog */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-serif text-sirius-green">Upcoming Offerings</h3>
        </div>

        {courses.length === 0 ? (
          <div className="bg-sirius-sand/30 border border-sirius-sand rounded-xl p-12 text-center">
            <p className="text-gray-600">New courses are being scheduled. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Teach Callout */}
      <section className="mt-24 bg-sirius-green text-sirius-sand rounded-2xl p-10 md:p-14 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-serif text-white mb-4">Want to teach?</h3>
          <p className="text-lg opacity-90 mb-8 leading-relaxed">
            We're always looking for instructors, elders, and practitioners with something to share — a craft, a body of ecological or spiritual work, a regenerative technology, or an obsession.
          </p>
          <a 
            href="mailto:education@siriuscommunity.org?subject=Teaching a Course at Sirius" 
            className="inline-flex items-center bg-sirius-clay hover:bg-sirius-clay/90 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email us what you'd teach
          </a>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M45.7,-76.4C58.9,-69.1,69.1,-55.5,76.5,-40.8C83.9,-26.1,88.4,-10.3,87.7,5.3C86.9,20.9,80.9,36.2,71.2,48.7C61.4,61.2,47.9,70.9,32.7,76.5C17.5,82.1,0.6,83.5,-15.5,80.3C-31.5,77,-46.8,69.1,-58.5,57.7C-70.2,46.2,-78.3,31.2,-83.1,15.1C-87.9,-1.1,-89.4,-18.3,-84.1,-33.6C-78.8,-48.9,-66.6,-62.3,-52.1,-69.2C-37.6,-76.1,-20.8,-76.5,-3.6,-71.4C13.6,-66.4,27.1,-55.9,45.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>
      
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="flex flex-col bg-white border border-sirius-sand hover:border-sirius-clay/30 hover:shadow-md transition-all rounded-xl overflow-hidden group">
      <div className="p-6 flex-grow flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tracks.map(track => (
            <span key={track} className="text-xs font-semibold uppercase tracking-wider text-sirius-clay bg-sirius-clay/10 px-2 py-1 rounded">
              {track}
            </span>
          ))}
        </div>
        
        {/* Title & Summary */}
        <h4 className="text-xl font-serif text-sirius-green font-medium mb-2 group-hover:text-sirius-clay transition-colors">
          {course.title}
        </h4>
        <p className="text-sm text-gray-600 mb-6 line-clamp-3">
          {course.summary}
        </p>
        
        {/* Meta Info */}
        <div className="space-y-2 mt-auto pt-4 border-t border-sirius-sand/50">
          {course.facilitatorName && (
            <div className="flex items-center text-sm text-gray-700">
              <Users className="w-4 h-4 mr-2 opacity-50" />
              <span>{course.facilitatorName}</span>
            </div>
          )}
          {course.dates && (
            <div className="flex items-center text-sm text-gray-700">
              <Calendar className="w-4 h-4 mr-2 opacity-50" />
              <span>{course.dates}</span>
            </div>
          )}
          {course.location && (
            <div className="flex items-center text-sm text-gray-700">
              <MapPin className="w-4 h-4 mr-2 opacity-50" />
              <span>{course.location}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Footer */}
      <div className="bg-sirius-sand/20 px-6 py-4 flex items-center justify-between mt-auto border-t border-sirius-sand">
        <span className="text-sm font-medium text-gray-800">
          {course.tuition || 'Sliding Scale'}
        </span>
        <a 
          href={course.applicationLink || `mailto:education@siriuscommunity.org?subject=Application for ${course.title}`}
          className="text-sm font-medium text-sirius-green hover:text-sirius-clay"
        >
          Apply &rarr;
        </a>
      </div>
    </div>
  );
}
