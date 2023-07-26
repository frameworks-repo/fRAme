# *LENS<sub>PEMS</sub>*: evaLuation framEwork for autoNomous Systems (LENS) for Programmable Electronic Medical Systems (PEMS)

<!-- The Web page of this reporsitory is available at this [link](https://martins83.github.io/LENS/). -->

LENS is a framework for evaluating autonomous systems whose preliminary version is part of a research work published in [ACSOS 2022](https://2022.acsos.org/) and available [here](https://ieeexplore.ieee.org/abstract/document/9935081):

      A. Bombarda, S. Bonfanti, M. De Sanctis, A. Gargantini, P. Pelliccione, E. Riccobene, P. Scandurra, 
      "Towards an Evaluation Framework for Autonomous Systems" in 2022 IEEE International Conference on Autonomic 
      Computing and Self-Organizing Systems Companion (ACSOS-C), pp. 43-48, doi: 10.1109/ACSOSC56246.2022.00025

This web page provides supplemental material related to the article titled **"_Evaluation Framework for Autonomous Systems: the case of PEMS_"** and submitted to the [IEEE Transactions on Software Engineering journal](https://ieeexplore.ieee.org/xpl/aboutJournal.jsp?punumber=32). LENS is an instrument to make an assessment of a system under the lens of abilities related to adaptation and smartness, and then to help software engineers in understanding in which direction is worth investing in to make their system smarter. It also helps to identify possible improvement directions and to plan for concrete activities. Finally, it helps to make a re-assessment when the improvement has been performed in order to check whether the plan has been accomplished.

## **Abilities in LENS<sub>PEMS</sub>** 
The Figure [Mapping the MAR abilities to LENS<sub>PEMS</sub>](https://foselab.github.io/LENS4PEMS/additional_material/Mapping%20table%20MAR%20LENS_PEMS.pdf) shows the abilities of LENS<sub>PEMS</sub> as the outcome of investigating the suitability of the MAR abilities for PEMS. For each ability, we also show the various ability levels. We highlight that we do not report those abilities and sub-abilities that do not apply to medical devices.
In the Figure, changes are highlighted with blue text (additive change) and gray strike-through text (reductive change). Lastly, gray cells identify those levels that have been completely removed. They cause a reduction in the levels numbering, by generating a mismatch between the numbering of MAR abilities and LENS<sub>PEMS</sub> abilities levels. 

## **Validation of LENS<sub>PEMS</sub>** 
We organized the validation of the LENS<sub>PEMS</sub> framework into the following three RQs, for which we provide the relevant documents.

> ### **RQ1 (Applicability):** How LENS<sub>PEMS</sub> is applicable to real PEMS?
> To validate the applicability of LENS<sub>PEMS</sub>, we show, in the article, its use in practice to evaluate a real PEMS, namely a mechanical ventilator (MVM), which has been developed during the COVID-19 pandemic also by most of the authors of this work [1].
> * The LENS<sub>PEMS</sub> framework can be found [here](https://foselab.github.io/LENS4PEMS/).
> * For convenience, we also report the [evaluation of the MVM case study](https://github.com/foselab/LENS4PEMS/raw/main/files/LENS_MVM_REPORT.pdf), as generated from the framework.
>   

> ### **RQ2 (Generalizability):** To what extent LENS<sub>PEMS</sub> is generalizable to the PEMS class of systems?
> To validate the generalizability of LENS<sub>PEMS</sub>, we collected a number of PEMS and analyzed the `fit for purpose` of the framework. Specifically, we evaluated whether the current abilities and sub-abilities, together with their levels, (i) are appropriate for evaluating these systems, (ii) need to be slightly changed to better match the needs of the considered PEMS,
> e.g. adapting some levels or removing or adding some of them, or (iii) abilities and sub-abilities should be removed or new ones should be added.
> 
> The list of PEMS evaluated for the generalizability of LENS<sub>PEMS</sub> is the following: 
> * Pillbox [2]
> * Insulin pump [3]
> * Smart ECG device [4, 5]
> * Hemodialysis machine [6]
> * Sterilizer for medical devices [7]
>
> Through their evaluation, we determined the necessary modifications for each of the examined PEMS. Once we confirmed that each modification was suitable for all the PEMS, we extended LENS<sub>PEMS</sub> accordingly.
> In the following document, all change proposals, with their motivations and final status have been tracked.
 >
 > * [LENS CHANGES](https://github.com/foselab/LENS4PEMS/raw/main/docs/additional_material/LENS_Changes.docx) 



> ### **RQ3 (Usefulness):** How LENS<sub>PEMS</sub> is useful in making an assessment of a PEMS and identifying possible directions of improvement towards smartness?
> To answer to this question we followed a mixed research methodology, including answers to a questionnaire and interviews.
> * The questionnaire is available [here](https://github.com/foselab/LENS4PEMS/raw/main/docs/additional_material/LENS4PEMS%20-%20Google%20Forms.pdf)
> * The anonymous responses to the questionnaire are available [here]() - TO BE ADDED
> * The transcription of interviews are available [here]() - TO BE ADDED


## **Replication package** 
The replication package for the literature review of the paper submitted to IEEE TSE is available [here](https://github.com/foselab/LENS4PEMS/raw/main/docs/additional_material/Literature_Review_Replication_Package.zip). 

## **Contributors**
* **Andrea Bombarda**, University of Bergamo (Italy)
* **Silvia Bonfanti**, University of Bergamo (Italy)
* **Martina De Sanctis**, Gran Sasso Science Institute (GSSI), (Italy)
* **Angelo Gargantini**, University of Bergamo (Italy)
* **Patrizio Pelliccione**, Gran Sasso Science Institute (GSSI), (Italy)
* **Elvinia Riccobene**, University of Milano (Italy)
* **Patrizia Scandurra**, University of Bergamo (Italy)


## **References** 
[1] A. Abba et al., “The novel mechanical ventilator milano for the COVID-19 pandemic,” Physics of Fluids, vol. 33, 2021.

[2] A. Bombarda, S. Bonfanti, and A. Gargantini, “Developing medical devices from abstract state machines to embedded systems: A smart pill box case study,” in Software Technology: Methods and Tools. Springer International Publishing, 2019, pp. 89–103. [Online]. Available: https://doi.org/10.1007/978-3-030-29852-4_71477

[3] C. Berget, L. H. Messer, and G. P. Forlenza, “A clinical overview of insulin pump therapy for the management of diabetes: Past, present, and future of intensive therapy,” Diabetes Spectrum, vol. 32, no. 3, pp. 194–204, Aug. 2019. [Online]. Available: https://doi.org/10.2337/ds18-00911491

[4] M. A. Serhani, H. T. E. Kassabi, H. Ismail, and A. N. Navaz, “ECG monitoring systems: Review, architecture, processes, and key challenges,” Sensors, vol. 20, no. 6, p. 1796, Mar. 2020. [Online]. Available: https://doi.org/10.3390/s200617961481

[5] M. M. Baig, H. Gholamhosseini, and M. J. Connolly, “A comprehensive survey of wearable and wireless ECG monitoring systems for older adults,” Medical & Biological Engineering & Computing, vol. 51, no. 5, pp. 485–495, Jan. 2013. [Online]. Available: https://doi.org/10.1007/s11517-012-1021-61486

[6] A. Mashkoor, “The hemodialysis machine case study,” in Abstract State Machines, Alloy, B, TLA, VDM, and Z, M. Butler, K.-D. Schewe, A. Mashkoor, and M. Biro, Eds. Cham: Springer International Publishing, 2016, pp. 329–343.1495

[7] Sterilizer: https://www.wh.com/en_global/dental-products/sterilization-hygienic-maintenance/sterilizers/lisa-autoclave/


