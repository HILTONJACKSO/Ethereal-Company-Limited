import os
import django
from datetime import date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import (
    User, Service, Partner, Project, ProjectGallery, 
    BlogCategory, BlogPost, Testimonial, CareerOpenings
)

def seed():
    print("Starting data seeding...")
    
    # 1. Fetch administrative user for author attribution
    admin_user = User.objects.filter(username="admin").first()
    if not admin_user:
        print("Admin user not found. Please run create_superuser.py first.")
        return

    # 2. Seed Services
    services_data = [
        {
            "title": "Construction Works & Renovations",
            "icon": "GiCrane",
            "short_description": "First-rate general construction, office fit-outs, residential complexes, and commercial structural renovations.",
            "detail": "### Overview\nEthereal Company Limited delivers top-tier structural developments across Liberia and Sierra Leone. We manage the entire construction lifecycle from zoning and planning to final interior hand-offs.\n\n### Architectural Renovation & Fit-Outs\nWe specialize in updating commercial workspaces to optimize productivity, modernizing legacy layouts, and maintaining structural integrity under rigorous tropical environmental stresses.",
            "benefits": ["Highly experienced engineering team", "Cost-effective procurement of building materials", "Compliance with international building codes"],
            "process_flow": ["Site survey and feasibility evaluation", "Architectural drafting and licensing", "Active construction phase", "Quality assurance and final handover"],
            "image_url": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
        },
        {
            "title": "Procurement of General Goods & Services",
            "icon": "FaHandshake",
            "short_description": "Strategic regional and international supply chain solutions linking local enterprises to global vendors.",
            "detail": "### Supply Chain Management\nWe serve as a reliable local partner procuring equipment, materials, and support services for corporate structures, government agencies, and non-profits in West Africa.",
            "benefits": ["Global network of verified suppliers", "Optimized tariff clearance workflows", "Fast transit and distribution pathways"],
            "process_flow": ["Request for quotation and sourcing", "Quality audit and validation", "Shipping and custom clearance logistics", "Client-side delivery verification"],
            "image_url": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
        },
        {
            "title": "Logistics Services",
            "icon": "FaTruck",
            "short_description": "Comprehensive freight forwarding, heavy haulage, warehousing, and regional supply chain management.",
            "detail": "### Cross-Border Logistics\nOur fleet of specialized transport vehicles handles high-volume cargo routing between major shipping hubs (e.g. Monrovia Port, Freetown Port) and inland mining/construction project locations.",
            "benefits": ["GPS-tracked cargo logistics", "Secure storage and dry distribution centers", "Off-road and rugged-terrain hauling capabilities"],
            "process_flow": ["Cargo inspection and packaging", "Transport planning and compliance clearance", "Transit monitoring and local dispatch", "Customer delivery signing"],
            "image_url": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
        },
        {
            "title": "Agriculture Equipment Supply & Consultancy",
            "icon": "FaSeedling",
            "short_description": "Modern machinery distribution and agronomic consultancy to boost farming productivity in Liberia and Sierra Leone.",
            "detail": "### Modernizing Agriculture\nWe supply high-efficiency tractors, harvesters, processing mills, and provide crop-management consulting services to support food security goals and commercial agriculture setups.",
            "benefits": ["Sourcing of heavy-duty components tailored for West African soil", "Agronomic and mechanization masterclasses", "Responsive repair and maintenance packages"],
            "process_flow": ["Soil and farm evaluation", "Equipment sizing and sourcing", "On-site installation and operator training", "Routine machinery servicing visits"],
            "image_url": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80"
        },
        {
            "title": "Mining Consultancy Services",
            "icon": "GiPickel",
            "short_description": "Expert geological surveying, resource mapping, regulatory compliance, and equipment supply chains.",
            "detail": "### Geological & Technical Consulting\nWe support operators navigating extraction rights, environmental impact assessments, and operations configuration in gold, diamond, iron ore, and bauxite concessions.",
            "benefits": ["In-depth understanding of local mining codes", "Geophysical mapping and reporting", "Operational supply chains for remote campsites"],
            "process_flow": ["Licensing and regulatory analysis", "Concession mapping and soil assay", "Operational design and safety workflow modeling", "Environmental audit management"],
            "image_url": "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80"
        },
        {
            "title": "Civil Engineering Works",
            "icon": "FaDraftingCompass",
            "short_description": "Designing and building essential municipal structures, drainage pathways, water supply grids, and retaining walls.",
            "detail": "### Infrastructure Foundation\nCivil works that stand the test of time. We address tropical drainage, erosion control, concrete bridges, and community-level infrastructure deployment.",
            "benefits": ["Highly trained design and safety engineers", "Use of structural modeling software", "Emphasis on localized sustainability and long-term durability"],
            "process_flow": ["Hydrological and soil modeling", "Structural schematics design", "Excavation and foundation laying", "Structural load verification and sign-off"],
            "image_url": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
        },
        {
            "title": "Road Maintenance & Construction",
            "icon": "FaRoad",
            "short_description": "High-quality asphalt paving, laterite stabilization, highway layout design, and culvert installation.",
            "detail": "### Building Highways to Connect Cities\nConnecting commerce corridors between major regions. We construct multi-lane paved corridors and deliver routine grading and repair for remote industrial pathways.",
            "benefits": ["High-capacity machinery fleet (graders, rollers, asphalt laydowns)", "Climate-resilient pavement construction", "Fast-response maintenance setups"],
            "process_flow": ["Right-of-way clearance and grading", "Basecourse stabilization and drainage preparation", "Asphalt/concrete laying", "Compaction testing and road striping"],
            "image_url": "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80"
        },
        {
            "title": "Import & Export Services",
            "icon": "FaShip",
            "short_description": "Comprehensive international trade brokerage handling ocean freight, custom clearances, and compliance protocols.",
            "detail": "### Global Trade Bridges\nEthereal facilitates bulk exports of regional agricultural products (cocoa, coffee, palm kernels) and handles the import of industrial components and processing systems.",
            "benefits": ["Deep custom brokerage connections", "Compliant documentation management", "Port clearance expediting"],
            "process_flow": ["Commercial invoice and trade license audit", "Port storage and container loading", "Maritime transport organization", "Destination port clearance and delivery"],
            "image_url": "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80"
        },
        {
            "title": "Project Implementation",
            "icon": "FaTasks",
            "short_description": "On-the-ground support for international development organizations, NGOs, and foreign investment entities.",
            "detail": "### Locally Guided Implementation\nWe act as local implementers for complex social-impact, agricultural, and construction programs, handling resource deployment, logistics, translation, and community integration.",
            "benefits": ["Established regional stakeholder relationships", "Rigorous budget tracking and audits", "Bilingual and community-oriented operation personnel"],
            "process_flow": ["Scope of work definition and localization", "Community consensus and leadership engagement", "Resource dispatch and monitoring", "Impact reporting and program evaluation"],
            "image_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
        }
    ]

    for item in services_data:
        Service.objects.get_or_create(
            title=item["title"],
            defaults={
                "icon": item["icon"],
                "short_description": item["short_description"],
                "detail": item["detail"],
                "benefits": item["benefits"],
                "process_flow": item["process_flow"],
                "image_url": item["image_url"]
            }
        )
    print("Services seeded successfully.")

    # 3. Seed Partners
    partners_data = [
        {"name": "M Square Africa", "logo_url": "https://images.unsplash.com/photo-1599305445671-ac2c0869a43a?auto=format&fit=crop&w=200&q=80", "description": "Regional business investment firm.", "impact": "Co-financed road infrastructure equipment acquisition.", "order": 1},
        {"name": "Talentia Africa Liberia", "logo_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80", "description": "Corporate capacity building organization.", "impact": "Trained over 200 heavy equipment operators and engineers.", "order": 2},
        {"name": "Sierra Mineral", "logo_url": "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=200&q=80", "description": "Large-scale extraction enterprise operating in Sierra Leone.", "impact": "Provided heavy hauling machinery and logistical dispatch routines.", "order": 3},
        {"name": "Foison Resource Sierra Leone Limited", "logo_url": "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=200&q=80", "description": "Mining operations and resource planning provider.", "impact": "Collaborated on geological concession survey projects in Eastern Province.", "order": 4}
    ]

    for item in partners_data:
        Partner.objects.get_or_create(
            name=item["name"],
            defaults={
                "logo_url": item["logo_url"],
                "description": item["description"],
                "impact": item["impact"],
                "order": item["order"]
            }
        )
    print("Partners seeded successfully.")

    # 4. Seed Projects
    projects_data = [
        {
            "title": "Nimba Ore Logistics Dispatch Corridor",
            "category": "Logistics & Haulage",
            "client": "ArcelorMittal Liberia Concessions",
            "location": "Nimba County, Liberia",
            "status": "Completed",
            "project_date": date(2025, 6, 15),
            "description": "Establishment of a 24/7 dedicated heavy-vehicle logistics chain between the Nimba extraction reserves and the Buchanan port facilities, carrying raw iron ore safely and efficiently.",
            "scope": "Procuring 50 high-tonnage dumpers, constructing custom mechanical rest stops, setting up a real-time satellite vehicle tracking room, and deploying road maintenance response trucks.",
            "challenges": "Frequent weather fluctuations leading to mud-slides on laterite corridors, causing logistics delays during monsoon months.",
            "solutions": "Laid crushed basalt rock foundations over critical sections and established 3 regional emergency depots with heavy towing assets.",
            "results": "Increased monthly ore haulage capacity by 35% and reduced road transit downtime from 3 days to less than 4 hours.",
            "cover_image_url": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
            "is_featured": True
        },
        {
            "title": "Kono Gold Concession Feasibility & Mapping",
            "category": "Mining Operations",
            "client": "Kono Mining Syndicate",
            "location": "Koidu, Sierra Leone",
            "status": "Completed",
            "project_date": date(2025, 11, 20),
            "description": "Detailed geological exploration, concession boundary surveying, and soil assaying to design primary extraction chambers for an underground mining initiative.",
            "scope": "Drone geophysical mapping over 500 hectares, drilling over 50 geological core samples, and drafting the Environmental Impact Assessment (EIA) for administrative licensing.",
            "challenges": "Dense forest canopy blocking GPS signals and complex local land rights negotiations.",
            "solutions": "Deployed RTK-enabled drone mapping systems and hosted multi-stakeholder community trust discussions to structure fair land leases.",
            "results": "Delivered a fully compliant exploration prospectus that unlocked $12M USD in foreign direct investments.",
            "cover_image_url": "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
            "is_featured": True
        },
        {
            "title": "Monrovia Ring-Road Laterite Stabilization",
            "category": "Road Construction",
            "client": "Ministry of Public Works Liberia",
            "location": "Monrovia, Liberia",
            "status": "In Progress",
            "project_date": date(2026, 2, 10),
            "description": "Upgrading and stabilizing 15 kilometers of the industrial bypass bypass road in Monrovia to facilitate cargo transportation from Freeport to urban zones.",
            "scope": "Excavation, grading, soil-cement stabilization, drainage culverts construction, and concrete curb pouring.",
            "challenges": "High urban traffic volume during the day and dense utility piping beneath the road surface.",
            "solutions": "Implemented night shifts between 8 PM and 5 AM and used underground scanning radars to map pipes before digging.",
            "results": "Road foundation is 80% stabilized. On track for completion before the start of the heavy rain season.",
            "cover_image_url": "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=1200&q=80",
            "is_featured": False
        }
    ]

    for item in projects_data:
        p, created = Project.objects.get_or_create(
            title=item["title"],
            defaults={
                "category": item["category"],
                "client": item["client"],
                "location": item["location"],
                "status": item["status"],
                "project_date": item["project_date"],
                "description": item["description"],
                "scope": item["scope"],
                "challenges": item["challenges"],
                "solutions": item["solutions"],
                "results": item["results"],
                "cover_image_url": item["cover_image_url"],
                "is_featured": item["is_featured"]
            }
        )
        
        # Add basic project gallery entries
        if created:
            ProjectGallery.objects.create(
                project=p,
                image_url="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
                caption="Operational machinery during grading phase"
            )
            ProjectGallery.objects.create(
                project=p,
                image_url="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
                caption="Final inspection check"
            )
    print("Projects seeded successfully.")

    # 5. Seed Testimonials
    testimonials_data = [
        {
            "client_name": "Hon. Marcus Cole",
            "company": "Ministry of Public Works, Liberia",
            "designation": "Deputy Minister of Infrastructure",
            "feedback": "Ethereal Company Limited has demonstrated an exceptional level of technical proficiency and dedication. Their work on the laterite stabilization projects was completed on schedule, despite a challenging rain season. They are a reliable local partner.",
            "rating": 5,
            "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
        },
        {
            "client_name": "Sahr Gborie",
            "company": "Kono Mining Consortium",
            "designation": "Operations Director",
            "feedback": "Their logistics capabilities are outstanding. Delivering heavy machinery and supplies to remote concessions in Eastern Sierra Leone is no small feat, but Ethereal kept our operations running smoothly without a single day of stoppage.",
            "rating": 5,
            "image_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
        }
    ]

    for item in testimonials_data:
        Testimonial.objects.get_or_create(
            client_name=item["client_name"],
            defaults={
                "company": item["company"],
                "designation": item["designation"],
                "feedback": item["feedback"],
                "rating": item["rating"],
                "image_url": item["image_url"]
            }
        )
    print("Testimonials seeded successfully.")

    # 6. Seed Blog
    cat, _ = BlogCategory.objects.get_or_create(name="Infrastructure Developments")
    
    BlogPost.objects.get_or_create(
        title="Developing West Africa's Corridors: The Logistics Edge",
        defaults={
            "category": cat,
            "author": admin_user,
            "status": "Published",
            "tags": "Logistics, Africa, Development, Infrastructure",
            "content": "### The Importance of Logistics\n\nEfficient transport corridors are the backbone of economic growth in West Africa. Cross-border trade between Liberia and Sierra Leone relies heavily on road networks that must withstand intense tropical weather patterns.\n\n#### Strategic Solutions\n\nDeploying modern mechanical fleets, using real-time GPS tracking, and employing locally adapted engineering methods are key to overcoming logistics hurdles. Ethereal Company Limited is proud to lead these operations in the region.",
            "featured_image_url": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
            "seo_title": "Developing West Africa's Corridors: Ethereal Company Limited",
            "seo_description": "Learn how Ethereal Company Limited is solving cross-border logistics challenges between Liberia and Sierra Leone."
        }
    )
    print("Blog posts seeded successfully.")

    # 7. Seed Careers
    CareerOpenings.objects.get_or_create(
        job_title="Heavy Equipment Operations Supervisor",
        defaults={
            "department": "Civil Engineering & Road Works",
            "location": "Monrovia, Liberia",
            "description": "We are seeking an experienced site manager to oversee the deployment, operation, and maintenance of road graders, compactors, and haulage fleets.",
            "requirements": [
                "Minimum 5 years of field experience in road construction setups.",
                "Proven leadership skills managing mechanical and engineering crews.",
                "Familiarity with safety standards and preventative maintenance procedures."
            ],
            "application_deadline": date(2026, 8, 30),
            "is_active": True
        }
    )
    print("Careers seeded successfully.")
    
    print("Seeding completed successfully!")

if __name__ == "__main__":
    seed()
