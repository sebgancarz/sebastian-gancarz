if (optionSelected) {
            const images = thisProduct.imageWrapper.querySelectorAll('img');

            images.forEach(image => {
            if (image.className.value === `${paramId}-${optionId}`) {
              image.classList.add(classNames.menuProduct.imageVisible);
            } else {
            image.classList.remove(classNames.menuProduct.imageVisible);
            }
          });
        }
