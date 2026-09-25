'use client';

import React, { useState } from 'react';
import { Course } from '@/lib/notion';

export default function CourseCatalog({ courses }: { courses: Course[] }) {
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  // Extract unique tracks
  const allTracks = ['All', ...Array.from(new Set(courses.flatMap(c => c.tracks)))];

  const filteredCourses = selectedTrack === 'All'
    ? courses
    : courses.filter(c => c.tracks.includes(selectedTrack));

  return (
    <div>
      {/* Category Filter Pills */}
      {allTracks.length > 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
          {allTracks.map(track => {
            const isActive = selectedTrack === track;
            return (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                style={{
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.15s ease',
                  backgroundColor: isActive ? '#2c4c3b' : '#ede8de',
                  color: isActive ? '#ffffff' : '#3d4d42',
                  boxShadow: isActive ? '0 2px 8px rgba(44, 76, 59, 0.25)' : 'none',
                }}
              >
                {track === 'All' ? 'All Offerings' : track}
              </button>
            );
          })}
        </div>
      )}

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4.5rem 2rem',
          backgroundColor: '#ffffff',
          border: '1px dashed #d5cebf',
          borderRadius: '16px'
        }}>
          <p style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontSize: '1.35rem',
            color: '#2c4c3b',
            marginBottom: '0.5rem'
          }}>
            No offerings found in this category yet.
          </p>
          <p style={{ color: '#68786e', fontSize: '0.95rem' }}>
            Check back soon or select another category above.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {filteredCourses.map(course => (
            <div
              key={course.id}
              onClick={() => setActiveCourse(course)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2dcd0',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                boxShadow: '0 4px 14px rgba(28, 43, 35, 0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(28, 43, 35, 0.12)';
                e.currentTarget.style.borderColor = '#b46e50';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(28, 43, 35, 0.05)';
                e.currentTarget.style.borderColor = '#e2dcd0';
              }}
            >
              {/* Top Accent Stripe */}
              <div style={{ height: '5px', backgroundColor: '#2c4c3b' }} />

              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* Track Tags */}
                {course.tracks.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.9rem' }}>
                    {course.tracks.map(t => (
                      <span
                        key={t}
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#b46e50',
                          backgroundColor: '#fbf0ea',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '999px',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h4 style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontSize: '1.35rem',
                  color: '#2c4c3b',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  marginBottom: '0.75rem',
                }}>
                  {course.title}
                </h4>

                {/* Summary */}
                {course.summary && (
                  <p style={{
                    fontSize: '0.92rem',
                    color: '#55655a',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {course.summary}
                  </p>
                )}

                {/* Quick Details */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '1.1rem',
                  borderTop: '1px solid #eee9df',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: '0.85rem',
                  color: '#55655a',
                }}>
                  {course.facilitatorName && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ opacity: 0.6 }}>👤</span>
                      <span style={{ fontWeight: 500, color: '#2c4c3b' }}>{course.facilitatorName}</span>
                    </div>
                  )}
                  {course.dates && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ opacity: 0.6 }}>📅</span>
                      <span>{course.dates}</span>
                    </div>
                  )}
                  {course.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ opacity: 0.6 }}>📍</span>
                      <span>{course.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Action */}
              <div style={{
                backgroundColor: '#faf8f4',
                padding: '0.9rem 1.75rem',
                borderTop: '1px solid #eee9df',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2c4c3b' }}>
                  {course.tuition || 'Sliding Scale'}
                </span>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#b46e50',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}>
                  View details & apply →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* POP-UP DETAIL MODAL */}
      {activeCourse && (
        <div
          onClick={() => setActiveCourse(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(28, 43, 35, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
              border: '1px solid #dcd4c5',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              animation: 'slideUp 0.25s ease-out',
            }}
          >
            {/* Modal Header Accent Bar */}
            <div style={{ height: '6px', backgroundColor: '#2c4c3b' }} />

            <div style={{ padding: '2.25rem 2.5rem' }}>
              {/* Close Button */}
              <button
                onClick={() => setActiveCourse(null)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  border: 'none',
                  background: '#f2ece2',
                  color: '#2c4c3b',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e3dacd'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#f2ece2'; }}
              >
                ✕
              </button>

              {/* Tags */}
              {activeCourse.tracks.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                  {activeCourse.tracks.map(t => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#b46e50',
                        backgroundColor: '#fbf0ea',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '999px',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h2 style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: '1.85rem',
                color: '#2c4c3b',
                fontWeight: 500,
                lineHeight: 1.25,
                marginBottom: '1rem',
              }}>
                {activeCourse.title}
              </h2>

              {/* Overview */}
              {activeCourse.summary && (
                <p style={{
                  fontSize: '1.05rem',
                  color: '#4a5b50',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}>
                  {activeCourse.summary}
                </p>
              )}

              {/* Course Logistics Details Card */}
              <div style={{
                backgroundColor: '#f9f7f2',
                border: '1px solid #eae3d5',
                borderRadius: '14px',
                padding: '1.4rem 1.6rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.2rem',
                marginBottom: '2rem',
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#88988e', marginBottom: '0.25rem' }}>
                    Facilitator
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#2c4c3b' }}>
                    {activeCourse.facilitatorName || 'Sirius Community Focalizer'}
                  </div>
                  {activeCourse.facilitatorBio && (
                    <div style={{ fontSize: '0.85rem', color: '#68786e', marginTop: '0.3rem', lineHeight: 1.4 }}>
                      {activeCourse.facilitatorBio}
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#88988e', marginBottom: '0.25rem' }}>
                    Schedule & Dates
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#2c4c3b' }}>
                    {activeCourse.dates || 'Dates to be announced'}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#88988e', marginBottom: '0.25rem' }}>
                    Location
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#2c4c3b' }}>
                    {activeCourse.location || 'Sirius Community Campus, Shutesbury MA'}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#88988e', marginBottom: '0.25rem' }}>
                    Tuition & Investment
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#2c4c3b' }}>
                    {activeCourse.tuition || 'Sliding Scale / Accessible'}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <a
                  href={activeCourse.applicationLink || `mailto:education@siriuscommunity.org?subject=Application for ${encodeURIComponent(activeCourse.title)}&body=Hello Sirius Education Circle,%0D%0A%0D%0AI would love to apply for "${encodeURIComponent(activeCourse.title)}".%0D%0A%0D%0AMy Name:%0D%0APhone / Contact:%0D%0ABrief note on my interest or background:%0D%0A%0D%0AThank you!`}
                  style={{
                    flexGrow: 1,
                    textAlign: 'center',
                    backgroundColor: '#a85c3a',
                    color: '#ffffff',
                    padding: '0.95rem 2rem',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(168, 92, 58, 0.3)',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#914d2e'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#a85c3a'; }}
                >
                  Apply for this Course →
                </a>

                <button
                  onClick={() => setActiveCourse(null)}
                  style={{
                    border: '1px solid #d5cebf',
                    background: 'transparent',
                    color: '#55655a',
                    padding: '0.95rem 1.4rem',
                    borderRadius: '999px',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
