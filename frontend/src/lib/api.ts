import axios from 'axios';

// Django API base configuration. Fallback to localhost.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ServiceData {
  id: number;
  title: string;
  slug: string;
  icon: string;
  short_description: string;
  detail: string;
  benefits: string[];
  process_flow: string[];
  image: string | null;
  image_url: string | null;
}

export interface ProjectGalleryData {
  id: number;
  image: string | null;
  image_url: string | null;
  is_video: boolean;
  video_url: string | null;
  caption: string | null;
}

export interface ProjectData {
  id: number;
  title: string;
  slug: string;
  category: string;
  client: string;
  location: string;
  status: string;
  project_date: string;
  description: string;
  scope: string;
  challenges: string | null;
  solutions: string | null;
  results: string | null;
  cover_image: string | null;
  cover_image_url: string | null;
  is_featured: boolean;
  gallery: ProjectGalleryData[];
}

export interface PartnerData {
  id: number;
  name: string;
  logo: string | null;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  impact: string | null;
  order: number;
}

export interface TestimonialData {
  id: number;
  client_name: string;
  company: string;
  designation: string | null;
  feedback: string;
  rating: number;
  image: string | null;
  image_url: string | null;
}

export interface BlogCategoryData {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPostData {
  id: number;
  title: string;
  slug: string;
  category: number;
  category_detail: BlogCategoryData;
  author: number;
  author_detail: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    role: string;
  };
  status: string;
  tags: string;
  content: string;
  featured_image: string | null;
  featured_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CareerData {
  id: number;
  job_title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  application_deadline: string;
  is_active: boolean;
  created_at: string;
}

// Service Methods
export const fetchServices = async (): Promise<ServiceData[]> => {
  const res = await apiClient.get('/services/');
  return res.data.results || res.data;
};

export const fetchServiceBySlug = async (slug: string): Promise<ServiceData> => {
  const res = await apiClient.get(`/services/${slug}/`);
  return res.data;
};

// Project Methods
export const fetchProjects = async (params?: { category?: string; is_featured?: boolean }): Promise<ProjectData[]> => {
  const res = await apiClient.get('/projects/', { params });
  return res.data.results || res.data;
};

export const fetchProjectBySlug = async (slug: string): Promise<ProjectData> => {
  const res = await apiClient.get(`/projects/${slug}/`);
  return res.data;
};

// Partners Methods
export const fetchPartners = async (): Promise<PartnerData[]> => {
  const res = await apiClient.get('/partners/');
  return res.data.results || res.data;
};

// Testimonials Methods
export const fetchTestimonials = async (): Promise<TestimonialData[]> => {
  const res = await apiClient.get('/testimonials/');
  return res.data.results || res.data;
};

// Blog Methods
export const fetchBlogPosts = async (params?: { category_slug?: string }): Promise<BlogPostData[]> => {
  const res = await apiClient.get('/blog-posts/', { params });
  return res.data.results || res.data;
};

export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPostData> => {
  const res = await apiClient.get(`/blog-posts/${slug}/`);
  return res.data;
};

// Contact form Submission
export const submitContactMessage = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<unknown> => {
  const res = await apiClient.post('/contact/', data);
  return res.data;
};

// Newsletter Subscription
export const submitNewsletterSubscription = async (email: string): Promise<unknown> => {
  const res = await apiClient.post('/newsletter/', { email });
  return res.data;
};

// Careers Methods
export const fetchCareers = async (): Promise<CareerData[]> => {
  const res = await apiClient.get('/careers/');
  return res.data.results || res.data;
};
