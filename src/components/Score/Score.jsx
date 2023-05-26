function Score({score, max, show, grade}){
    const baseStyle = "w-24 font-medium px-4 py-2 text-center rounded-[2rem] shadow"
    if (!show){
      return <div className={baseStyle + " bg-gray-400 dark:bg-gray-600"}>
        - {max ? "/" +max : ""}
      </div>;
    }
    if (typeof grade === 'string'){
      switch (grade[0]){
        case 'A':
          return <div className={baseStyle + " bg-green-500"}>
            {grade}
          </div>;
        case 'B':
          return <div className={baseStyle + " bg-lime-400"}>
            {grade}
          </div>;
        case 'C':
          return <div className={baseStyle + " bg-yellow-400"}>
            {grade}
          </div>;
        case 'D':
          return <div className={baseStyle + " bg-orange-500"}>
            {grade}
          </div>;
        case 'F':
          return <div className={baseStyle + " bg-red-500"}>
            {grade}
          </div>;
        default:
          return <div className={baseStyle + " bg-gray-400 dark:bg-gray-600"}>
            -
          </div>;
      }
    }else if (typeof grade === 'number') {
      let perc = grade/4;
      if (perc < 0.5){
        return <div className={baseStyle + " bg-red-500"}>
          {grade}
        </div>;
      }
      if (perc < 0.75){
        return <div className={baseStyle + " bg-orange-500"}>
          {grade}
        </div>;
      }
      if (perc < 0.8){
        return <div className={baseStyle + " bg-yellow-400"}>
          {grade}
        </div>;
      }
      if (perc < 0.9){
        return <div className={baseStyle + " bg-lime-400"}>
          {grade}
        </div>;
      }
      return <div className={baseStyle + " bg-green-500"}>
          {grade}
        </div>;
    }
    let perc = score/max;
    if (perc < 0.5){
      return <div className={baseStyle + " bg-red-500"}>
        {score}/{max}
      </div>;
    }
    if (perc < 0.6){
      return <div className={baseStyle + " bg-orange-500"}>
        {score}/{max}
      </div>;
    }
    if (perc < 0.7){
      return <div className={baseStyle + " bg-yellow-400"}>
        {score}/{max}
      </div>;
    }
    if (perc < 0.8){
      return <div className={baseStyle + " bg-lime-400"}>
        {score}/{max}
      </div>;
    }
    return <div className={baseStyle + " bg-green-500"}>
        {score}/{max}
      </div>;
  }

  export default Score