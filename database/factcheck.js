export const factchecks = [
    {
        articleId: 19,
        status: "verified",
        factsummary: "The Gen Z Mob announced plans to hold a demonstration at Bangkok's Democracy Monument. The announcement was reported by Thairath, identifying the planned protest and its intended location. Further independent reporting or confirmation of the demonstration's occurrence has not yet been added.",

        claims: [
            {
                id: 1,
                statement: "The Gen Z Mob announced a demonstration at Bangkok's Democracy Monument.",

                status: "Verified",

                evidence: [
                    {
                        title: "Original Thairath report",
                        source: "Thairath",
                        url: "https://en.thairath.co.th/news/local/2973595",
                        type: "News Report",
                        supports: true
                    }
                ],

                notes: "The original report describes the planned demonstration. Independent confirmation has not yet been added."
            }
        ]
    },


    {
        articleId: 18,
        status: "partially-verified",
        factsummary: "Prime Minister Anutin Charnvirakul discussed Thailand's trade declaration with the United States, outlining its goals of expanding bilateral trade and creating more opportunities for Thai exports. He addressed possible reciprocal tariff adjustments and conditions on American agricultural imports, including domestic-use requirements and import quotas, with further details expected from the Ministry of Commerce. He also highlighted Thailand's support for ASEAN's Digital Economy Framework Agreement (DEFA), which aims to improve regional digital trade, online security, fraud prevention, cybersecurity and consumer protection.",

        claims: [
            {
                id: 1,
                statement: "Prime Minister Anutin stated that the Thailand–US trade declaration aims to increase bilateral trade and create more opportunities for Thai products in the US market.",
                status: "partially-verified",

            
                evidence: [
                    {
                        title: "PM Highlights Details of Thailand–US Trade Deal",
                        source: "Thairath",
                        url: "https://en.thairath.co.th/news/politic/2973787",
                        type: "News Report",
                        supports: true
                    }
                ],

                notes: "The Thairath report attributes these statements to Prime Minister Anutin. Independent sources confirming the agreement's terms and expected economic effects have not yet been added."
            }
        ]
    }

];