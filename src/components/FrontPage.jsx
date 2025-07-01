import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Settings, MessageCircle, Zap, ChevronDown, Menu, X, Check } from 'lucide-react';

const FrontPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a1628 0%, #1e3a8a 50%, #1e40af 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: '1000',
        background: scrollY > 50 ? 'rgba(10, 22, 40, 0.95)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid rgba(59, 130, 246, 0.2)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
            }}>
              <Zap style={{ width: '22px', height: '22px', color: 'white' }} />
            </div>
            <span style={{
              fontSize: '26px',
              fontWeight: '700',
              color: 'white',
              letterSpacing: '-0.5px'
            }}>
              Samparka
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div style={{
            display: window.innerWidth >= 768 ? 'flex' : 'none',
            alignItems: 'center',
            gap: '40px'
          }}>
            <a href="#features" style={{
              color: '#e2e8f0',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '8px 0',
              borderBottom: '2px solid transparent'
            }} onMouseEnter={(e) => {
              e.target.style.color = '#3b82f6';
              e.target.style.borderBottomColor = '#3b82f6';
            }} onMouseLeave={(e) => {
              e.target.style.color = '#e2e8f0';
              e.target.style.borderBottomColor = 'transparent';
            }}>Features</a>
            
            <a href="#about" style={{
              color: '#e2e8f0',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '8px 0',
              borderBottom: '2px solid transparent'
            }} onMouseEnter={(e) => {
              e.target.style.color = '#3b82f6';
              e.target.style.borderBottomColor = '#3b82f6';
            }} onMouseLeave={(e) => {
              e.target.style.color = '#e2e8f0';
              e.target.style.borderBottomColor = 'transparent';
            }}>About</a>
            
            <a href="#contact" style={{
              color: '#e2e8f0',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '8px 0',
              borderBottom: '2px solid transparent'
            }} onMouseEnter={(e) => {
              e.target.style.color = '#3b82f6';
              e.target.style.borderBottomColor = '#3b82f6';
            }} onMouseLeave={(e) => {
              e.target.style.color = '#e2e8f0';
              e.target.style.borderBottomColor = 'transparent';
            }}>Contact</a>
            
            <button style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '8px',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
            }}>
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            style={{
              display: window.innerWidth >= 768 ? 'none' : 'flex',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '8px'
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{
            display: window.innerWidth >= 768 ? 'none' : 'block',
            background: 'rgba(10, 22, 40, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(59, 130, 246, 0.2)',
            padding: '20px 40px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <a href="#features" style={{
                color: '#e2e8f0',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 0',
                borderBottom: '1px solid rgba(59, 130, 246, 0.1)'
              }}>Features</a>
              <a href="#about" style={{
                color: '#e2e8f0',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 0',
                borderBottom: '1px solid rgba(59, 130, 246, 0.1)'
              }}>About</a>
              <a href="#contact" style={{
                color: '#e2e8f0',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 0',
                borderBottom: '1px solid rgba(59, 130, 246, 0.1)'
              }}>Contact</a>
              <button style={{
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '8px',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '10px'
              }}>
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '120px 40px 80px 40px',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: window.innerWidth >= 768 ? '64px' : '42px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #ffffff, #93c5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Connect, Manage & Collaborate
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: '#cbd5e1',
            lineHeight: '1.6',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px auto'
          }}>
            Transform the way your team works with Samparka's powerful platform. 
            Seamlessly integrate communication, project management, and collaboration.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '60px'
          }}>
            <button
              onClick={() => navigate('/SignupPage')}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '8px',
                border: 'none',
                fontSize: '18px',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 30px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.3)';
              }}
            >
              Start Building
              <ArrowRight style={{ marginLeft: '8px', width: '20px', height: '20px' }} />
            </button>
          </div>

          {/* Feature Tags */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px'
          }}>
            {[
              { icon: Users, title: 'Connect' },
              { icon: Settings, title: 'Manage' },
              { icon: MessageCircle, title: 'Collaborate' }
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '25px',
                  color: '#93c5fd',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  <Icon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                  {feature.title}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <ChevronDown style={{ 
            width: '32px', 
            height: '32px', 
            color: 'rgba(147, 197, 253, 0.6)',
            animation: 'bounce 2s infinite'
          }} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: '80px 40px',
        background: 'rgba(30, 58, 138, 0.3)',
        borderTop: '1px solid rgba(59, 130, 246, 0.2)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: window.innerWidth >= 768 ? '42px' : '32px',
              fontWeight: '700',
              marginBottom: '16px',
              color: 'white'
            }}>
              Everything You Need
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#cbd5e1',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Powerful features designed to supercharge your team's productivity and collaboration
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 1024 ? 'repeat(3, 1fr)' : window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr',
            gap: '30px'
          }}>
            {[
              {
                icon: Users,
                title: 'Smart Connections',
                description: 'Build meaningful professional relationships with intuitive networking tools and smart contact management that grows with your network.'
              },
              {
                icon: Settings,
                title: 'Unified Management',
                description: 'Centralize all your projects, tasks, and resources in one intuitive dashboard that adapts to your workflow and team size.'
              },
              {
                icon: MessageCircle,
                title: 'Real-time Collaboration',
                description: 'Work together seamlessly with live editing, instant messaging, and integrated communication tools for maximum productivity.'
              }
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} style={{
                  padding: '40px 30px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                  }}>
                    <Icon style={{ width: '28px', height: '28px', color: 'white' }} />
                  </div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: 'white'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#cbd5e1',
                    lineHeight: '1.6'
                  }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: window.innerWidth >= 768 ? '42px' : '32px',
            fontWeight: '700',
            marginBottom: '20px',
            color: 'white'
          }}>
            Ready to Transform Your Workflow?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#cbd5e1',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Start building better connections and managing your projects more effectively with Samparka's comprehensive platform.
          </p>
          
          <button
            onClick={() => navigate('/SignupPage')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 48px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '8px',
              border: 'none',
              fontSize: '20px',
              fontWeight: '700',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.3)';
            }}
          >
            Start Building
            <ArrowRight style={{ marginLeft: '12px', width: '22px', height: '22px' }} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px',
        textAlign: 'center',
        background: 'rgba(10, 22, 40, 0.9)',
        color: '#64748b',
        fontSize: '14px'
      }}>
        © 2025 Samparka. All rights reserved.
      </footer>

      {/* Bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
      `}</style>
    </div>
  );
};

export default FrontPage;
