import { getPublishedCourses } from '@/lib/notion';
import CourseCatalog from '@/components/CourseCatalog';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const courses = await getPublishedCourses();

  return (
    <div style={{ backgroundColor: '#faf9f5', minHeight: '100vh' }}>
      
      {/* Editorial Hero Banner */}
      <section style={{
        backgroundColor: '#f1ede4',
        padding: '5.5rem 2rem 5rem',
        borderBottom: '1px solid #e2dcd0',
      }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#a85c3a',
            marginBottom: '1.25rem',
          }}>
            Shutesbury, Massachusetts · Pioneer Valley Bioregion
          </p>

          <h1 style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            color: '#2c4c3b',
            fontWeight: 400,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}>
            A living curriculum for a regenerative culture.
          </h1>

          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '1.15rem',
            color: '#4e5f54',
            lineHeight: 1.75,
            maxWidth: '680px',
            margin: '0 auto',
          }}>
            Community-led courses, workshops, and immersive learning grounded in ecological stewardship, mutual aid, and dharmic practice — rooted in the intentional village of Sirius.
          </p>
        </div>
      </section>

      {/* Main Course Offerings Section */}
      <section id="offerings" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4.5rem 2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          borderBottom: '1px solid #e2dcd0',
          paddingBottom: '1.25rem',
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: '2rem',
              color: '#2c4c3b',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              marginBottom: '0.25rem',
            }}>
              Upcoming Offerings
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#66776c' }}>
              Browse upcoming cohorts and workshops. Click any course for full details, syllabus, and application info.
            </p>
          </div>

          <span style={{
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#8b9b90',
            backgroundColor: '#eae5db',
            padding: '0.35rem 0.8rem',
            borderRadius: '999px',
          }}>
            {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
          </span>
        </div>

        {/* Interactive Catalog with Category Filters and Pop-Up Cards */}
        <CourseCatalog courses={courses} />
      </section>

      {/* Fractal-Style "Want to Teach?" Callout */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 6rem', padding: '0 2rem' }}>
        <div style={{
          backgroundColor: '#2c4c3b',
          borderRadius: '20px',
          padding: '3.75rem 3.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2.5rem',
          boxShadow: '0 16px 40px rgba(44, 76, 59, 0.2)',
          backgroundImage: 'radial-gradient(circle at top right, #395c4a 0%, #2c4c3b 70%)',
        }}>
          <div style={{ maxWidth: '600px' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#d6c5a5',
              display: 'block',
              marginBottom: '0.75rem',
            }}>
              Decentralized Education
            </span>
            <h3 style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: '2.3rem',
              color: '#ffffff',
              fontWeight: 400,
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}>
              Want to teach at Sirius?
            </h3>
            <p style={{
              color: '#d0dfd4',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}>
              We’re always looking for instructors, elders, and practitioners with something to share — a craft, a body of ecological or spiritual work, a regenerative technology, or an obsession. Email us with a sentence or two about what you'd teach.
            </p>
          </div>

          <a
            href="mailto:education@siriuscommunity.org?subject=Teaching an Offering at Sirius&body=Hello Sirius Education Circle,%0D%0A%0D%0AI would love to propose a class or workshop:%0D%0A%0D%0ATitle / Idea:%0D%0AWho I am:%0D%0ABrief description of what I would teach:%0D%0APreferred timing or season:%0D%0A%0D%0AThank you!"
            style={{
              display: 'inline-block',
              backgroundColor: '#a85c3a',
              color: '#ffffff',
              padding: '1rem 2.25rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s ease',
            }}
          >
            Email what you'd teach →
          </a>
        </div>
      </section>

    </div>
  );
}
