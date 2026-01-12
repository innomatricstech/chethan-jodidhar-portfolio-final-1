import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const Projects_Banner_Section = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROJECTS FROM FIREBASE ---------------- */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="bg-[#faf5fa] py-12 md:py-24">
      {/* HEADER */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-[#48A77E] font-bold text-3xl md:text-5xl">
          PROJECTS
        </h1>
        <div className="bg-[#800080] h-1 w-16 md:w-20"></div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-center mt-10 text-gray-500">
          Loading projects...
        </p>
      ) : projects.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          No projects available
        </p>
      ) : (
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* IMAGE */}
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-56 object-cover"
                loading="lazy"
              />

              {/* DETAILS */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-bold text-lg uppercase">
                  {project.name}
                </h2>

                <p className="text-sm text-gray-600">
                  Year : {project.year}
                </p>

                {/* LINK */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-center border border-purple-600 text-purple-600 py-1 rounded-md hover:bg-purple-600 hover:text-white transition"
                  >
                    View Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FUTURE PROJECTS */}
      <div className="container mx-auto flex flex-col items-center lg:items-start gap-4 mt-16 px-4">
        <h2 className="font-bold uppercase text-xl md:text-2xl">
          Future Projects
        </h2>
        <div className="bg-[#eb2beb] h-[2px] w-16"></div>
        <p className="max-w-3xl text-gray-700 leading-6 text-center lg:text-left">
          Chethan's future in filmmaking is filled with exciting possibilities.
          With several innovative projects in development, he is focused on
          exploring contemporary social issues through impactful storytelling.
        </p>
        <button className="border border-black px-8 py-2 hover:bg-[#800080] hover:text-white transition">
          Let's Work Together
        </button>
      </div>
    </section>
  );
};

export default Projects_Banner_Section;
