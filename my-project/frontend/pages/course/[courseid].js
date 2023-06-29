import { fetchAPI } from "../../lib/api"

// for some reason, when we are in this object the course has been
// turned in to course == [global{}, course{}] vs the course{} directly
// probably something to do with the getStaticProps function.
const Course = ( course ) => {
  course = course.course;
  //<h1>{course.attributes.ClassName}</h1>
  console.log("next hi")
  console.log(course)
  console.log("another hi")
  console.log(Object.keys(course))
  return (
    <h1>{course.attributes.coursename}</h1>

  )
}

export async function getStaticPaths() {
  const coursesRes = await fetchAPI("/courses", { fields: ["courseid"] })

  console.log("get paths hi!!");
  console.log(coursesRes);
  console.log(coursesRes.data[0]);

  return {
    paths: coursesRes.data.map((course) => ({
      params: {
        courseid: course.attributes.courseid,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const coursesRes = await fetchAPI("/courses", {
    filters: {
      courseid: params.courseid,
    },
    populate: "*",
  })
  console.log("hi!!");
  console.log(coursesRes);
  console.log(coursesRes.data[0]);
  return {
    props: { course: coursesRes.data[0] },
    revalidate: 1,
  }

}

export default Course
