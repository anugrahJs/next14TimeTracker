import Link from "next/link";

const ProjectsPage = () => {
  return (
    <div className="container">
      <div>
        <h1>Projects</h1>
        <button>
          <Link href="/admin/projects-add-edit">ADD NEW PROJECT</Link>
        </button>
      </div>
      <form>
        <select>
          <option>Client</option>
          <option>Suzzane</option>
          <option>Helena</option>
          <option>Emily</option>
          <option>Lauren</option>
          <option>Sophie</option>
        </select>
        <input type="text" placeholder="Search by project name" />
        <button>Search</button>
      </form>
      <div>
        <div>Project</div>
        <div>Client</div>
        <div>Hours</div>
        <div>Team</div>
      </div>
    </div>
  );
};

export default ProjectsPage;
