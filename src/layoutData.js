export default {
  /* layout */
  layout: {
    type: "row",
    children: [
      {
        id: "1",
        type: "container",
        //maximise: false,
        size: "100%",
        children: [
          {
            title: "11title",
            tooltip: "titletootip"
          },
          {
            title: "11titlesasfdfsdasdffsdsdf"
          },
          {
            title: "11title3333fassfadsdafasfd",
            selected: true
          },
          {
            title: "11titl"
          },
          {
            title: "11titlesf"
          },
          {
            title: "11titlesf"
          },
          {
            title: "11titlesf"
          },
          {
            title: "11titlesf"
          },
          {
            title: "11titlesf"
          }
        ]
      },
      {
        type: "splitter",
        vertical: true,
        size: "3px"
      },
      {
        type: "column",
        children: [
          {
            id: "2",
            type: "container",
            size: "100%",
            children: [
              {
                title: "22title",
                tooltip: "titletootip"
              },
              {
                title: "22titlesf"
              },
              {
                title: "22title3333",
                selected: true
              },
              {
                title: "22tit"
              },
              {
                title: "22t"
              }
            ]
          },
          {
            type: "splitter",
            vertical: false,
            size: "3px"
          },
          {
            type: "row",
            children: [
              {
                id: "3",
                type: "container",
                size: "100%",
                children: [
                  {
                    title: "22title",
                    tooltip: "titletootip",
                    selected: true
                  },
                  {
                    title: "22titlesf"
                  }
                ]
              },
              {
                type: "splitter",
                size: "3px"
              },
              {
                id: "4",
                type: "container",
                size: "100%",
                children: [
                  {
                    title: "22title",
                    tooltip: "titletootip"
                  },
                  {
                    title: "22titlesf",
                    selected: true
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "splitter",
        vertical: true,
        size: "3px"
      },
      {
        id: "5",
        type: "container",
        size: "200px",
        children: [
          {
            title: "22title",
            tooltip: "titletootip"
          },
          {
            title: "22titlesf"
          },
          {
            title: "22title3333",
            selected: true
          },
          {
            title: "22tit"
          },
          {
            title: "22t"
          }
        ]
      }
    ]
  }
};
